/**
 * @author pontx-generator
 * @description API 类型定义
 */

import type * as schemas from './schemas';

// ============ data 模块 ============

export declare namespace data {
  export type GetDataByFlowParams = {
    /**
     * @description An ISO 8601 or SDMX reporting period: annual, semi-annual, quarterly, monthly, weekly, or daily.
     */
    startPeriod?: string;
    /**
     * @description An ISO 8601 or SDMX reporting period: annual, semi-annual, quarterly, monthly, weekly, or daily.
     */
    endPeriod?: string;
    /**
     * @description Return the latest values added, revised, or deleted after this ISO 8601 timestamp.
     */
    updatedAfter?: string;
    /**
     * @description Maximum observations returned per matching time series, starting at the first observation.
     */
    firstNObservations?: number;
    /**
     * @description Maximum observations returned per matching time series, counting backward from the latest observation.
     */
    lastNObservations?: number;
    /**
     * @description Amount of data detail returned.
     */
    detail?: 'full' | 'dataonly' | 'serieskeysonly' | 'nodata';
    /**
     * @description Whether to include historical versions of matching data.
     */
    includeHistory?: boolean;
    /**
     * @description Response format; it can also be selected through the Accept header.
     */
    format?: 'csvdata' | 'jsondata' | 'structurespecificdata' | 'genericdata';
  };

  export type GetDataBySeriesKeyParams = {
    /**
     * @description An ISO 8601 or SDMX reporting period: annual, semi-annual, quarterly, monthly, weekly, or daily.
     */
    startPeriod?: string;
    /**
     * @description An ISO 8601 or SDMX reporting period: annual, semi-annual, quarterly, monthly, weekly, or daily.
     */
    endPeriod?: string;
    /**
     * @description Return the latest values added, revised, or deleted after this ISO 8601 timestamp.
     */
    updatedAfter?: string;
    /**
     * @description Maximum observations returned per matching time series, starting at the first observation.
     */
    firstNObservations?: number;
    /**
     * @description Maximum observations returned per matching time series, counting backward from the latest observation.
     */
    lastNObservations?: number;
    /**
     * @description Amount of data detail returned.
     */
    detail?: 'full' | 'dataonly' | 'serieskeysonly' | 'nodata';
    /**
     * @description Whether to include historical versions of matching data.
     */
    includeHistory?: boolean;
    /**
     * @description Response format; it can also be selected through the Accept header.
     */
    format?: 'csvdata' | 'jsondata' | 'structurespecificdata' | 'genericdata';
  };

}

export type data = {
  /**
   * GET /data/{flowRef}
   * Returns data from a dataflow. This variant omits the Series key and can therefore match many time series; callers should bound the response with date, detail, or observation-count parameters.
   * @summary: Get data by dataflow
   */
  getDataByFlow: (
    /**
     * @description Dataflow reference: a flow ID, or comma-separated agency ID, flow ID, and version.
     */
    flowRef: string,
    params: data.GetDataByFlowParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.SdmxDataMessage>;

  /**
   * GET /data/{flowRef}/{key}
   * Returns time series matching a Series key within a dataflow. The key follows DSD dimension order with dot separators; an empty segment is a wildcard and `+` is OR. Bound response size with date or observation-count parameters.
   * @summary: Get data by dataflow and Series key
   */
  getDataBySeriesKey: (
    /**
     * @description Dataflow reference: a flow ID, or comma-separated agency ID, flow ID, and version.
     */
    flowRef: string,
    /**
     * @description Series key in DSD dimension order; dot-separated, with empty wildcard segments and `+` for OR.
     */
    key: string,
    params: data.GetDataBySeriesKeyParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.SdmxDataMessage>;

};

// ============ metadata 模块 ============

export declare namespace metadata {
  export type ListMetadataParams = {
    /**
     * @description Structural metadata detail level.
     */
    detail?: 'full' | 'allstubs' | 'referencestubs';
    /**
     * @description Includes or excludes related artefacts; a concrete resource type is also accepted.
     */
    references?: string;
  };

  export type ListMetadataByAgencyParams = {
    /**
     * @description Structural metadata detail level.
     */
    detail?: 'full' | 'allstubs' | 'referencestubs';
    /**
     * @description Includes or excludes related artefacts; a concrete resource type is also accepted.
     */
    references?: string;
  };

  export type GetMetadataArtefactParams = {
    /**
     * @description Structural metadata detail level.
     */
    detail?: 'full' | 'allstubs' | 'referencestubs';
    /**
     * @description Includes or excludes related artefacts; a concrete resource type is also accepted.
     */
    references?: string;
  };

  export type GetVersionedMetadataArtefactParams = {
    /**
     * @description Structural metadata detail level.
     */
    detail?: 'full' | 'allstubs' | 'referencestubs';
    /**
     * @description Includes or excludes related artefacts; a concrete resource type is also accepted.
     */
    references?: string;
  };

}

export type metadata = {
  /**
   * GET /{resource}
   * Returns all available structural metadata for an SDMX artefact type.
   * @summary: List a structural metadata type
   */
  listMetadata: (
    /**
     * @description SDMX structural-metadata artefact type.
     */
    resource: 'datastructure' | 'metadatastructure' | 'categoryscheme' | 'Conceptscheme' | 'codelist' | 'hierarchicalcodelist' | 'organisationscheme' | 'agencyscheme' | 'dataproviderscheme' | 'dataconsumerscheme' | 'organisationunitscheme' | 'dataflow' | 'metadataflow' | 'reportingtaxonomy' | 'provisionagreement' | 'structureset' | 'process' | 'categorisation' | 'contentconstraint' | 'attachmentconstraint' | 'structure',
    params: metadata.ListMetadataParams,
    requestInit?: RequestInit,
  ) => Promise<string>;

  /**
   * GET /{resource}/{agencyID}
   * Returns structural metadata of one type maintained by a specified SDMX agency.
   * @summary: List structural metadata by maintainer
   */
  listMetadataByAgency: (
    /**
     * @description SDMX structural-metadata artefact type.
     */
    resource: 'datastructure' | 'metadatastructure' | 'categoryscheme' | 'Conceptscheme' | 'codelist' | 'hierarchicalcodelist' | 'organisationscheme' | 'agencyscheme' | 'dataproviderscheme' | 'dataconsumerscheme' | 'organisationunitscheme' | 'dataflow' | 'metadataflow' | 'reportingtaxonomy' | 'provisionagreement' | 'structureset' | 'process' | 'categorisation' | 'contentconstraint' | 'attachmentconstraint' | 'structure',
    /**
     * @description Identifier of the SDMX agency maintaining the artefact.
     */
    agencyID: string,
    params: metadata.ListMetadataByAgencyParams,
    requestInit?: RequestInit,
  ) => Promise<string>;

  /**
   * GET /{resource}/{agencyID}/{resourceID}
   * Returns the latest structural metadata version for a maintainer and resource identifier.
   * @summary: Get a structural metadata artefact
   */
  getMetadataArtefact: (
    /**
     * @description SDMX structural-metadata artefact type.
     */
    resource: 'datastructure' | 'metadatastructure' | 'categoryscheme' | 'Conceptscheme' | 'codelist' | 'hierarchicalcodelist' | 'organisationscheme' | 'agencyscheme' | 'dataproviderscheme' | 'dataconsumerscheme' | 'organisationunitscheme' | 'dataflow' | 'metadataflow' | 'reportingtaxonomy' | 'provisionagreement' | 'structureset' | 'process' | 'categorisation' | 'contentconstraint' | 'attachmentconstraint' | 'structure',
    /**
     * @description Identifier of the SDMX agency maintaining the artefact.
     */
    agencyID: string,
    /**
     * @description SDMX artefact identifier.
     */
    resourceID: string,
    params: metadata.GetMetadataArtefactParams,
    requestInit?: RequestInit,
  ) => Promise<string>;

  /**
   * GET /{resource}/{agencyID}/{resourceID}/{version}
   * Returns structural metadata for a maintainer, resource identifier, and version.
   * @summary: Get a versioned structural metadata artefact
   */
  getVersionedMetadataArtefact: (
    /**
     * @description SDMX structural-metadata artefact type.
     */
    resource: 'datastructure' | 'metadatastructure' | 'categoryscheme' | 'Conceptscheme' | 'codelist' | 'hierarchicalcodelist' | 'organisationscheme' | 'agencyscheme' | 'dataproviderscheme' | 'dataconsumerscheme' | 'organisationunitscheme' | 'dataflow' | 'metadataflow' | 'reportingtaxonomy' | 'provisionagreement' | 'structureset' | 'process' | 'categorisation' | 'contentconstraint' | 'attachmentconstraint' | 'structure',
    /**
     * @description Identifier of the SDMX agency maintaining the artefact.
     */
    agencyID: string,
    /**
     * @description SDMX artefact identifier.
     */
    resourceID: string,
    /**
     * @description SDMX artefact version.
     */
    version: string,
    params: metadata.GetVersionedMetadataArtefactParams,
    requestInit?: RequestInit,
  ) => Promise<string>;

};

// ============ validation 模块 ============

export type validation = {
  /**
   * GET /schema/{context}/{agencyID}/{resourceID}
   * Generates the latest Structure Specific Data XML Schema for a context, maintainer, and resource identifier.
   * @summary: Get the latest structure-specific data XML Schema
   */
  getStructureSpecificSchema: (
    /**
     * @description SDMX constraint context used to generate the XML Schema.
     */
    context: 'datastructure' | 'dataflow' | 'provisionagreement',
    /**
     * @description Identifier of the SDMX agency maintaining the artefact.
     */
    agencyID: string,
    /**
     * @description SDMX artefact identifier.
     */
    resourceID: string,
    requestInit?: RequestInit,
  ) => Promise<string>;

  /**
   * GET /schema/{context}/{agencyID}/{resourceID}/{version}
   * Generates a Structure Specific Data XML Schema for a context, maintainer, resource identifier, and version.
   * @summary: Get a versioned structure-specific data XML Schema
   */
  getVersionedStructureSpecificSchema: (
    /**
     * @description SDMX constraint context used to generate the XML Schema.
     */
    context: 'datastructure' | 'dataflow' | 'provisionagreement',
    /**
     * @description Identifier of the SDMX agency maintaining the artefact.
     */
    agencyID: string,
    /**
     * @description SDMX artefact identifier.
     */
    resourceID: string,
    /**
     * @description SDMX artefact version.
     */
    version: string,
    requestInit?: RequestInit,
  ) => Promise<string>;

};

// ============ API 集合类型 ============

/**
 * API 类型定义
 */
export type APIs = {
  /** data 模块 */
  data: data;
  /** metadata 模块 */
  metadata: metadata;
  /** validation 模块 */
  validation: validation;
};

export declare namespace APIs {
  export { data };
  export { metadata };
  export { validation };
}
