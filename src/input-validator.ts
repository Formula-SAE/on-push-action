type Inputs = {
  event: string;
  apiToken: string;
  apiUrl: string;
  providers: string;
  refName: string;
};

export class InputValidator {
  private inputs: Inputs;

  public constructor(inputs: Inputs) {
    this.inputs = inputs;
  }

  public getError(): string | undefined {
    if (
      !this.inputs.event ||
      !this.inputs.apiToken ||
      !this.inputs.providers ||
      !this.inputs.apiUrl
    ) {
      let error = "invalid inputs:";

      if (!this.inputs.event) error += "EVENT, ";
      if (!this.inputs.apiToken) error += "API_TOKEN, ";
      if (!this.inputs.apiUrl) error += "API_URL, ";
      if (!this.inputs.providers) error += "PROVIDERS";

      return error;
    }

    return undefined;
  }
}
