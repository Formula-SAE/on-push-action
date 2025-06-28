type Commit = {
  message: string;
  timestamp: string;
  url: string;
  author: Author;
};

type Author = {
  name: string;
};

type Repository = {
  name: string;
};

export type PushPayload = {
  commits: Commit[];
  forced: boolean;
  pusher: Author;
  ref: string;
  repository: Repository;
};

export type ProviderConfig = {
  provider: string;
  channel: string;
};
