export const QueryKeys = Object.freeze({
  chats: 'chats',
  currentContactInfo: 'currentContactInfo',
  addChat: 'addChat',
} as const);

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
