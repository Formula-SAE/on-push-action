import { PushPayload } from "./types";

export function generateMessage(payload: PushPayload, refName: string): string {
  const commits = payload.commits.map(
    (e) =>
      `
  - Autore: __${e.author.name}__
    Data Creazione: ${new Date(e.timestamp).toLocaleString()}
    Messaggio: "**${e.message}**"
    URL: ${e.url}`
  );

  let message = `
  💥 **Nuovo push ${payload.forced ? "(FORZATO ⚠️) " : ""}da parte di**:  __${payload.pusher.name}__:

${refName != "" ? `**🪾 Branch**: \`\`\`${refName}\`\`\`\n` : ""}: 
**📄 Commits**:
  ${commits.join("\n")}`;

  return message;
}
