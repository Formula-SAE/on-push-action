import { PushPayload } from "./types";

export function generateMessage(payload: PushPayload): string {
  const commits = payload.commits.map(
    (e) =>
      `
  - Autore: ${e.author.name}
    Data Creazione: ${e.timestamp}
    Messaggio: ${e.message}
    URL: ${e.url}`,
  );

  let message = `
  Nuovo push ${payload.forced ? "FORZATO" : ""} da parte di ${payload.pusher.name}:
  
  Commits:
    ${commits.join("\n")}`;

  return message;
}
