export const QueryKeys = Object.freeze({
  chats: 'chats',
  addChat: 'addChat',
} as const);

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
