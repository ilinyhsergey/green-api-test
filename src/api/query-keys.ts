export const QueryKeys = Object.freeze({
  chats: 'chats',
  addChat: 'addChat',
  currentContactInfo: 'currentContactInfo',
  lastMessages: 'lastMessages',
  sendMessage: 'sendMessage',
  notification: 'notification',
} as const);

export type QueryKeys = typeof QueryKeys[keyof typeof QueryKeys];
