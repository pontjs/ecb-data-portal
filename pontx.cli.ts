import { runCLI } from "pontx/sdk-cli";

export default runCLI({
  name: "pontx-ecb-data-portal",
  executeApi: {
    baseURL: "https://data-api.ecb.europa.eu/service",
  },
  generateSamples: [{
    case: "nodejs",
    "description": "Generate sample code for Node.js",
    "generateSample": async (api, options) => {
      return `import ecbDataPortalClient from "@pontx/ecb-data-portal";

async function main() {
  const response = await ecbDataPortalClient.data.getDataBySeriesKey(
    "EXR",
    "M.USD.EUR.SP00.A",
    { lastNObservations: 1, format: "jsondata" },
  );
  console.log(response);
}

main();
      `;
    }
  }]
});
