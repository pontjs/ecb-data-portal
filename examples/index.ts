import ecbDataPortalClient from "../src";

const response = await ecbDataPortalClient.data.getDataBySeriesKey(
  "EXR",
  "M.USD.EUR.SP00.A",
  { lastNObservations: 1, format: "jsondata" },
);
console.log(response);
