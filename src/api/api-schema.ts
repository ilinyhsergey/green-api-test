export interface GetContactsResponse {
  chatId: string;
  contactName: string;
  name: string;
  phoneNumber: number;
  type: string;
  [property: string]: any;
}

export interface GetChatResponse {
  chatId: string;
  phoneNumber: number;
  [property: string]: any;
}

export interface CheckAccountRequest {
  phoneNumber: number;
  [property: string]: any;
}

export interface CheckAccountResponse {
  chatId: string;
  exist: boolean;
  fromCache: boolean;
  phoneNumber: number;
  username: string;
  [property: string]: any;
}

export interface GetContactInfoRequest {
  chatId: string;
  [property: string]: any;
}

export interface GetContactInfoResponse {
  avatar: string;
  chatId: string;
  contactName: string;
  lastSeen: number;
  name: string;
  phoneNumber: number;
  chatType:"user"
  description: string;
  isPremium:boolean;
  isScam: boolean;
  isVerified:boolean;
  phoneNumberTimestamp: number;
  username: string;
  [property: string]: any;
}

export interface LastMessagesRequest {
  /**
   * Время в минутах
   */
  minutes: string;
  [property: string]: any;
}

export interface BaseMessagesResponse {
  chatId?: string;
  chatType: string;
  deletedMessageId?: string;
  editedMessageId?: string;
  forwardingScore: number;
  idMessage?: string;
  isDeleted?: boolean;
  isEdited?: boolean;
  isForwarded: boolean;
  textMessage?: string;
  timestamp?: number;
  type?: string;
  typeMessage?: string;
  [property: string]: any;
}

export interface IncomingMessagesResponse extends BaseMessagesResponse {
  senderContactName?: string;
  senderId?: string;
  senderName?: string;
  senderType: string;
}

export interface OutgoingMessagesResponse extends BaseMessagesResponse {
  sendByApi?: boolean;
  statusMessage?: string;
}

export interface SendMessageRequest {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  typingTime?: number;
  typingType?: string;
  [property: string]: any;
}

export interface SendMessageResponse {
  idMessage: string;
  [property: string]: any;
}


export interface NotificationResponse {
  body: Body;
  receiptId: number;
  [property: string]: any;
}

export interface Body {
  idMessage: string;
  instanceData: InstanceData;
  messageData: MessageData;
  senderData: SenderData;
  timestamp: number;
  typeWebhook: string;
  [property: string]: any;
}

export interface InstanceData {
  idInstance: number;
  typeInstance: string;
  wid: string;
  [property: string]: any;
}

export interface MessageData {
  textMessageData: TextMessageData;
  typeMessage: string;
  [property: string]: any;
}

export interface TextMessageData {
  textMessage: string;
  [property: string]: any;
}

export interface SenderData {
  chatId: string;
  sender: string;
  senderName: string;
  [property: string]: any;
}

export interface DeleteNotificationResponse {
  reason: string;
  result: boolean;
  [property: string]: any;
}