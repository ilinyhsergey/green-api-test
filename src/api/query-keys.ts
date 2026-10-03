export const QueryKeys = Object.freeze({
  chats: 'chats',
  addChat: 'addChat',
  currentContactInfo: 'currentContactInfo',
  lastMessages: 'lastMessages',
  sendMessage: 'sendMessage',
} as const);

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
