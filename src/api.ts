import { ProviderConfig } from "./types";

export async function sendRequest(
  content: string,
  providerConfigs: ProviderConfig[],
  apiToken: string,
  url: string
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      providers: providerConfigs,
    }),
  });

  if (response.ok) return;

  throw new Error(await response.text());
}
