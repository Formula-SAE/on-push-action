import { PushPayload } from "./types";

export function generateMessage(payload: PushPayload, refName: string): string {
  const commits = payload.commits.map(
    (e) =>
      `
  - Autore: <i>${e.author.name}</i>
    Data Creazione: ${new Date(e.timestamp).toLocaleString()}
    Messaggio: <b>${e.message.split("\n")[0]}</b>
    <a href="${e.url}">Link al commit</a>`,
  );

  let message = `
  💥 <b>Nuovo push ${payload.forced ? "(FORZATO ⚠️) " : ""}da parte di</b>:  <i>${payload.pusher.name}</i>

${refName != "" ? `<b>🪾 Branch</b>: <code>${refName}</code>\n` : ""}
<b>📄 Commits</b>:
  ${commits.join("\n")}`;

  return message;
}
