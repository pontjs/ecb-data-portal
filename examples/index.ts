import { createEcbDataPortalClient } from "../src";

const client = createEcbDataPortalClient();
const response = await client.data.getDataBySeriesKey(
  "EXR",
  "M.USD.EUR.SP00.A",
  { lastNObservations: 1, format: "jsondata" },
);
console.log(response);
