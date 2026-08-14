import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const cli = resolve(repositoryRoot, "dist/bin/cli.cjs");

test("the built ECB SDK completes JSON and XML HTTP round trips", async (context) => {
  const requests = [];
  const dataPayload = {
    header: { id: "e2e-test", sender: { id: "ECB" } },
    dataSets: [{ series: {} }],
    structure: { name: "Exchange Rates" },
  };
  const metadataPayload =
    "<mes:Structure xmlns:mes=\"urn:sdmx:org.sdmx.infomodel.message:2.1\"/>";
  const server = createServer((request, response) => {
    requests.push({ method: request.method, url: request.url });
    if (request.url?.startsWith("/service/data/")) {
      response.writeHead(200, {
        "content-type": "application/vnd.sdmx.data+json;version=1.0.0-wd",
      });
      response.end(JSON.stringify(dataPayload));
      return;
    }
    response.writeHead(200, {
      "content-type": "application/vnd.sdmx.structure+xml;version=2.1",
    });
    response.end(metadataPayload);
  });
  await new Promise((resolveListen) =>
    server.listen(0, "127.0.0.1", resolveListen),
  );
  context.after(() => new Promise((resolveClose) => server.close(resolveClose)));

  const address = server.address();
  assert(address && typeof address === "object");
  const localOrigin = `http://127.0.0.1:${address.port}`;
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => {
    const requested = new URL(String(input));
    return nativeFetch(
      new URL(`${requested.pathname}${requested.search}`, localOrigin),
      init,
    );
  };
  context.after(() => {
    globalThis.fetch = nativeFetch;
  });

  const esm = await import(
    `${pathToFileURL(resolve(repositoryRoot, "dist/index.mjs")).href}?e2e=${Date.now()}`,
  );
  const data = await esm.default.data.getDataBySeriesKey(
    "EXR",
    "M.USD.EUR.SP00.A",
    { lastNObservations: 1, format: "jsondata" },
  );
  assert.deepEqual(data, dataPayload);
  const metadata = await esm.default.metadata.getMetadataArtefact(
    "dataflow",
    "ECB",
    "EXR",
    { detail: "allstubs", references: "none" },
  );
  assert.equal(metadata, metadataPayload);
  assert.deepEqual(requests, [
    {
      method: "GET",
      url: "/service/data/EXR/M.USD.EUR.SP00.A?lastNObservations=1&format=jsondata",
    },
    {
      method: "GET",
      url: "/service/dataflow/ECB/EXR?detail=allstubs&references=none",
    },
  ]);

  const require = createRequire(import.meta.url);
  const cjs = require(resolve(repositoryRoot, "dist/index.js"));
  assert.equal(cjs.default, cjs.ecbDataPortalClient);
});

test("the ECB CLI exposes the generated contract and a bounded dry run", async () => {
  const { stdout: help } = await execFileAsync(process.execPath, [cli, "--help"], {
    cwd: repositoryRoot,
  });
  assert.match(help, /pontx-ecb-data-portal/);

  const { stdout: api } = await execFileAsync(
    process.execPath,
    [cli, "show-api", "data", "getDataBySeriesKey"],
    { cwd: repositoryRoot },
  );
  assert.match(api, /Get data by dataflow and Series key/);
  assert.match(api, /SdmxDataMessage/);

  const { stdout: dryRunStdout, stderr: dryRunStderr } = await execFileAsync(
    process.execPath,
    [
      cli,
      "call",
      "data",
      "getDataBySeriesKey",
      "--flowRef",
      "EXR",
      "--key",
      "M.USD.EUR.SP00.A",
      "--lastNObservations",
      "1",
      "--format",
      "jsondata",
      "--dry-run",
    ],
    { cwd: repositoryRoot },
  );
  const dryRun = `${dryRunStdout}${dryRunStderr}`;
  assert.match(dryRun, /Dry run - request not sent/);
  assert.match(dryRun, /lastNObservations: 1/);
  assert.doesNotMatch(dryRun, /Authorization|api[_-]?key/i);
});

test("the npm package contains the SDK, declarations, CLI, lock, and README", async () => {
  const { stdout } = await execFileAsync("npm", ["pack", "--dry-run", "--json"], {
    cwd: repositoryRoot,
  });
  const [packed] = JSON.parse(stdout);
  const files = new Set(packed.files.map((file) => file.path));
  for (const expected of [
    "README.md",
    "dist/index.d.ts",
    "dist/index.js",
    "dist/index.mjs",
    "dist/bin/api-lock.json",
    "dist/bin/cli.cjs",
  ]) {
    assert(files.has(expected), `missing npm artifact: ${expected}`);
  }
});
