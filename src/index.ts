import { createGracefulClient, type GracefulClient } from "@pontx/sdk";
import type { APIs } from "./apis/ecb/apis";
import { specMeta } from "./apis/ecb/apiMeta";

const DEFAULT_BASE_URL = "https://data-api.ecb.europa.eu/service";

export type EcbDataPortalClient = GracefulClient<APIs> &
  APIs["data"] & APIs["metadata"] & APIs["validation"];

export interface EcbDataPortalClientOptions {
  /** Override the official ECB Data Portal origin, primarily for testing. */
  baseUrl?: string;
  /** Provide a custom fetch implementation without changing global state. */
  fetch?: typeof globalThis.fetch;
}

/** Create an isolated ECB Data Portal SDK client. */
export function createEcbDataPortalClient(
  options: EcbDataPortalClientOptions = {},
): EcbDataPortalClient {
  return createGracefulClient<APIs>({
    pontxSpecMeta: specMeta as never,
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    baseRequestFn: (url, init) => {
      const fetchRequest = options.fetch ?? globalThis.fetch;
      return fetchRequest(url, init as RequestInit).then(async (response) => {
        const contentType = response.headers.get("content-type") ?? "";
        if (!response.ok) {
          throw new Error(
            `ECB request failed: ${response.status} ${await response.text()}`,
          );
        }
        return contentType.includes("json") ? response.json() : response.text();
      });
    },
  }) as EcbDataPortalClient;
}

/** @deprecated Prefer createEcbDataPortalClient() so runtime configuration is explicit. */
const ecbDataPortalClient = createEcbDataPortalClient();

export { ecbDataPortalClient };
export default ecbDataPortalClient;
