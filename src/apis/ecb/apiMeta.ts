export const specMeta = {
  name: "ECB Data Portal SDMX API",
  hasTags: true,
  url: [
    {
      url: "https://data-api.ecb.europa.eu/service"
    }
  ],
  apis: {
    "data/getDataByFlow": {
      method: "GET",
      path: "/data/{flowRef}",
      consumes: [],
      produces: ["application/vnd.sdmx.data+json;version=1.0.0-wd","application/json","text/csv","application/vnd.ecb.data+csv;version=1.0.0","application/vnd.sdmx.genericdata+xml;version=2.1","application/vnd.sdmx.structurespecificdata+xml;version=2.1","application/xml","text/plain"],
      pathParams: ["flowRef"],
      queryParams: ["startPeriod", "endPeriod", "updatedAfter", "firstNObservations", "lastNObservations", "detail", "includeHistory", "format"],
      bodyParams: null
    },

    "data/getDataBySeriesKey": {
      method: "GET",
      path: "/data/{flowRef}/{key}",
      consumes: [],
      produces: ["application/vnd.sdmx.data+json;version=1.0.0-wd","application/json","text/csv","application/vnd.ecb.data+csv;version=1.0.0","application/vnd.sdmx.genericdata+xml;version=2.1","application/vnd.sdmx.structurespecificdata+xml;version=2.1","application/xml","text/plain"],
      pathParams: ["flowRef", "key"],
      queryParams: ["startPeriod", "endPeriod", "updatedAfter", "firstNObservations", "lastNObservations", "detail", "includeHistory", "format"],
      bodyParams: null
    },

    "metadata/listMetadata": {
      method: "GET",
      path: "/{resource}",
      consumes: [],
      produces: ["application/vnd.sdmx.structure+xml;version=2.1","application/xml","text/plain","application/json"],
      pathParams: ["resource"],
      queryParams: ["detail", "references"],
      bodyParams: null
    },

    "metadata/listMetadataByAgency": {
      method: "GET",
      path: "/{resource}/{agencyID}",
      consumes: [],
      produces: ["application/vnd.sdmx.structure+xml;version=2.1","application/xml","text/plain","application/json"],
      pathParams: ["resource", "agencyID"],
      queryParams: ["detail", "references"],
      bodyParams: null
    },

    "metadata/getMetadataArtefact": {
      method: "GET",
      path: "/{resource}/{agencyID}/{resourceID}",
      consumes: [],
      produces: ["application/vnd.sdmx.structure+xml;version=2.1","application/xml","text/plain","application/json"],
      pathParams: ["resource", "agencyID", "resourceID"],
      queryParams: ["detail", "references"],
      bodyParams: null
    },

    "metadata/getVersionedMetadataArtefact": {
      method: "GET",
      path: "/{resource}/{agencyID}/{resourceID}/{version}",
      consumes: [],
      produces: ["application/vnd.sdmx.structure+xml;version=2.1","application/xml","text/plain","application/json"],
      pathParams: ["resource", "agencyID", "resourceID", "version"],
      queryParams: ["detail", "references"],
      bodyParams: null
    },

    "validation/getStructureSpecificSchema": {
      method: "GET",
      path: "/schema/{context}/{agencyID}/{resourceID}",
      consumes: [],
      produces: ["application/vnd.sdmx.schema+xml;version=2.1","application/xml","text/xml","text/plain","application/json"],
      pathParams: ["context", "agencyID", "resourceID"],
      queryParams: null,
      bodyParams: null
    },

    "validation/getVersionedStructureSpecificSchema": {
      method: "GET",
      path: "/schema/{context}/{agencyID}/{resourceID}/{version}",
      consumes: [],
      produces: ["application/vnd.sdmx.schema+xml;version=2.1","application/xml","text/xml","text/plain","application/json"],
      pathParams: ["context", "agencyID", "resourceID", "version"],
      queryParams: null,
      bodyParams: null
    }
  }
} as const;
