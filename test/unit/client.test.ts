import { afterEach, describe, expect, it, vi } from "vitest";
import ecbDataPortalClient, {
  ecbDataPortalClient as namedClient,
} from "../../src/index";

describe("@pontx/ecb-data-portal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exports the same client as the default and named entrypoint", () => {
    expect(ecbDataPortalClient).toBe(namedClient);
  });

  it("serializes an EXR series request and decodes SDMX JSON", async () => {
    const payload = {
      header: { id: "unit-test", sender: { id: "ECB" } },
      dataSets: [{ series: {} }],
      structure: { name: "Exchange Rates" },
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        headers: { "content-type": "application/vnd.sdmx.data+json;version=1.0.0-wd" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      ecbDataPortalClient.data.getDataBySeriesKey(
        "EXR",
        "M.USD.EUR.SP00.A",
        { lastNObservations: 1, format: "jsondata" },
      ),
    ).resolves.toEqual(payload);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://data-api.ecb.europa.eu/service/data/EXR/M.USD.EUR.SP00.A?lastNObservations=1&format=jsondata",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("preserves an SDMX structural-metadata XML response as text", async () => {
    const xml = "<mes:Structure xmlns:mes=\"urn:sdmx:org.sdmx.infomodel.message:2.1\"/>";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(xml, {
        headers: { "content-type": "application/vnd.sdmx.structure+xml;version=2.1" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      ecbDataPortalClient.metadata.getMetadataArtefact(
        "dataflow",
        "ECB",
        "EXR",
        { detail: "allstubs", references: "none" },
      ),
    ).resolves.toBe(xml);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://data-api.ecb.europa.eu/service/dataflow/ECB/EXR?detail=allstubs&references=none",
      expect.objectContaining({ method: "GET" }),
    );
  });
});
