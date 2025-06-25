type Commit = {
  message: string;
  timestamp: string;
  url: string;
  author: Author;
};

type Author = {
  name: string;
};

export type PushPayload = {
  commits: Commit[];
  forced: boolean;
  pusher: Author;
};

export type ProviderConfig = {
  provider: string;
  channel: string;
};
