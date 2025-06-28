import { ProviderConfig } from "./types";

export class ProviderParser {
  private providerString: string;

  public constructor(providerString: string) {
    this.providerString = providerString;
  }

  public getConfigs(): ProviderConfig[] {
    const providerList = this.providerString.split(",");

    const providerConfigs = providerList
      .map((e) => e.split(":"))
      .filter((e) => e.length == 2)
      .map<ProviderConfig>((e) => ({ provider: e[0], channel: e[1] }));

    return providerConfigs;
  }
}
