import { setFailed, getInput, debug } from "@actions/core";
import { parseEvent } from "./event-parser";
import { sendRequest } from "./api";
import { MessageGenerator } from "./message";
import { ProviderParser } from "./providers";
import { InputValidator } from "./input-validator";

export async function run(): Promise<void> {
  try {
    const event = getInput("event");
    const apiToken: string = getInput("apiToken");
    const apiUrl: string = getInput("apiUrl");
    const providers: string = getInput("providers");
    const refName: string = getInput("refName");

    const validator = new InputValidator({
      apiToken: apiToken,
      apiUrl: apiUrl,
      event: event,
      providers: providers,
      refName: refName,
    });
    const error = validator.getError();
    if (error) {
      setFailed(error);
      return;
    }

    const parsedEvent = parseEvent(event);
    debug(`Parsed event; ${event}`);

    const providerParser = new ProviderParser(providers);
    const configs = providerParser.getConfigs();

    const generator = new MessageGenerator(parsedEvent, refName);
    const message = generator.generateMessage();
    debug(`Message: ${message}`);

    await sendRequest(message, configs, apiToken, apiUrl);
  } catch (error: any) {
    setFailed(error);
  }
}
