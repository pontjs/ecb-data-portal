import { createGracefulClient, type GracefulClient } from "@pontx/sdk";
import { APIs } from "./apis/ecb/apis";
import { specMeta } from "./apis/ecb/apiMeta";

const ecbDataPortalClient = createGracefulClient<APIs>({
  pontxSpecMeta: specMeta as any,
  baseUrl: "https://data-api.ecb.europa.eu/service",
  baseRequestFn: (url, init) => {
    return fetch(url, init).then(async (res) => {
      const contentType = res.headers.get("content-type") ?? "";
      if (!res.ok) {
        throw new Error(`ECB request failed: ${res.status} ${await res.text()}`);
      }
      return contentType.includes("json") ? res.json() : res.text();
    });
  },
}) as GracefulClient<APIs> & APIs["data"] & APIs["metadata"] & APIs["validation"];

export { ecbDataPortalClient };

export default ecbDataPortalClient;
