import { ProviderConfig } from "./types";

export async function sendRequest(
  content: string,
  providerConfigs: ProviderConfig[],
  apiToken: string,
  url: string,
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { Authentication: `Bearer ${apiToken}` },
    body: JSON.stringify({
      content,
      providers: providerConfigs,
    }),
  });

  if (response.ok) return;

  throw new Error(await response.text());
}
