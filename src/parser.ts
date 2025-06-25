import { PushPayload } from "./types";

export function parseEvent(event: string) {
  return JSON.parse(event) as PushPayload;
}
