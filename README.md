# @pontx/ecb-data-portal

Type-safe TypeScript SDK and CLI for the ECB Data Portal SDMX API. The package
is generated from the curated Pontx OpenAPI contract and tested against local
contract fixtures plus bounded public ECB read requests.

```bash
npm install @pontx/ecb-data-portal
```

## SDK

```ts
import ecbDataPortalClient from "@pontx/ecb-data-portal";

const result = await ecbDataPortalClient.data.getDataBySeriesKey(
  "EXR",
  "M.USD.EUR.SP00.A",
  { lastNObservations: 1, format: "jsondata" },
);
```

## CLI

```bash
pontx-ecb-data-portal show-api data getDataBySeriesKey
pontx-ecb-data-portal call data getDataBySeriesKey \
  --flowRef EXR \
  --key M.USD.EUR.SP00.A \
  --lastNObservations 1 \
  --format jsondata \
  --dry-run
```

ECB data and metadata remain subject to the ECB website reuse terms. This is an
independent Pontx client package and is not an official ECB package.
