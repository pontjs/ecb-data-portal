/**
 * @title SDMX data message
 * @description An SDMX-JSON 1.0.0-wd data message. The schema models the top-level, structure, dimension, attribute, series, and observation relationships declared by ECB content negotiation and verified in a bounded live response; dynamic Series keys and observation indexes are represented as maps.
 */
export type SdmxDataMessage = {
  header: SdmxHeader;
  dataSets: Array<SdmxDataSet>;
  structure: SdmxStructure;
}

/**
 * @title SDMX message header
 * @description SDMX message header.
 */
export type SdmxHeader = {
  id: string;
  test: boolean;
  prepared: string;
  sender: SdmxSender;
}

/**
 * @title SDMX sender
 * @description Message sender.
 */
export type SdmxSender = {
  id: string;
}

/**
 * @title SDMX resource link
 * @description Link to a related SDMX resource.
 */
export type SdmxLink = {
  title?: any;
  rel: string;
  href: string;
}

/**
 * @title SDMX data structure
 * @description SDMX data structure describing dimensions, attributes, and their value dictionaries.
 */
export type SdmxStructure = {
  links?: Array<SdmxLink>;
  name?: string;
  dimensions: SdmxComponentGroups;
  attributes: SdmxComponentGroups;
}

/**
 * @title SDMX component groups
 */
export type SdmxComponentGroups = {
  series: Array<SdmxComponent>;
  observation: Array<SdmxComponent>;
}

/**
 * @title SDMX dimension or attribute
 * @description An SDMX dimension or attribute definition.
 */
export type SdmxComponent = {
  id: string;
  name: string;
  role?: any;
  values: Array<SdmxComponentValue>;
}

/**
 * @title SDMX component value
 * @description A value-dictionary entry for an SDMX dimension or attribute.
 */
export type SdmxComponentValue = {
  id?: any;
  name?: any;
  start?: any;
  end?: any;
}

/**
 * @title SDMX dataset
 * @description An SDMX dataset whose Series keys are dynamic map keys.
 */
export type SdmxDataSet = {
  action: string;
  validFrom?: any;
  series: Record<any, SdmxSeries>;
}

/**
 * @title SDMX time series
 * @description One matching time series and its observations.
 */
export type SdmxSeries = {
  attributes?: Array<any>;
  observations?: Record<any, SdmxObservationTuple>;
}

/**
 * @title SDMX observation tuple
 * @description Tuple containing an observation value and attribute indexes.
 */
export type SdmxObservationTuple = Array<any>

/**
 * @title ECB error response
 * @description ECB does not declare a stable error-body schema; the SDK preserves an error body as a string.
 */
export type ErrorBody = string