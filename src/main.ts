import { setFailed, getInput, debug } from "@actions/core";
import { parseEvent } from "./parser";
import { ProviderConfig } from "./types";
import { sendRequest } from "./api";
import { generateMessage } from "./message";

export async function run(): Promise<void> {
  try {
    const event = getInput("event");
    const apiToken: string = getInput("apiToken");
    const apiUrl: string = getInput("apiUrl");
    const providers: string = getInput("providers");

    if (!event || !apiToken || !providers || !apiUrl) {
      let error = "invalid inputs:";

      if (!event) error += "EVENT, ";
      if (!apiToken) error += "API_TOKEN, ";
      if (!apiUrl) error += "API_URL, ";
      if (!providers) error += "PROVIDERS";

      setFailed(error);
      return;
    }

    const parsedEvent = parseEvent(event);

    const providerList = providers.split(",");
    const providerConfigs = providerList
      .filter((e) => e.length === 2)
      .map<ProviderConfig>((e) => ({ provider: e[0], channel: e[1] }));

    const message = generateMessage(parsedEvent);

    await sendRequest(message, providerConfigs, apiToken, apiUrl);
  } catch (error: any) {
    setFailed(error);
  }
}
