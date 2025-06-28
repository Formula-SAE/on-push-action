import { PushPayload } from "./types";

export class MessageGenerator {
	private payload: PushPayload;
	private refName: string;

	public constructor(payload: PushPayload, refName: string) {
		this.payload = payload;
		this.refName = refName;
	}

	public generateMessage(): string {
		let message = `
    💥 <b>Nuovo push ${this.payload.forced ? "(FORZATO ⚠️) " : ""}da parte di</b>:  <i>${this.payload.pusher.name}</i>`;

		if (this.payload.ref.startsWith("refs/tags/")) {
			message += `\n\n<b>Creato tag</b>: ${this.payload.ref.slice(10)}`;
			return message;
		}

		if (this.payload.commits.length == 0) {
			message += `\n\n<b>Creato branch</b>: ${this.payload.ref.slice(11)}`;
		}

		const commits = this.payload.commits.map(
			(e) =>
				`
    - Autore: <i>${e.author.name}</i>
      Data Creazione: ${new Date(e.timestamp).toLocaleString()}
      Messaggio: <b>${e.message.split("\n")[0]}</b>
      <a href="${e.url}">Link al commit</a>`
		);

		message += `
${this.refName != "" ? `<b>🪾 Branch</b>: <code>${this.refName}</code>\n` : ""}
<b>📄 Commits</b>:
  ${commits.join("\n")}`;

		return message;
	}
}
