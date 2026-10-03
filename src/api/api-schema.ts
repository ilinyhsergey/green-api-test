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

export interface LastIncomingMessagesRequest {
  /**
   * Время в минутах
   */
  minutes: string;
  [property: string]: any;
}
export interface LastIncomingMessagesResponse {
  chatId?: string;
  chatType:string;
  deletedMessageId?: string;
  editedMessageId?: string;
  forwardingScore:number;
  idMessage?: string;
  isDeleted?: boolean;
  isEdited?: boolean;
  isForwarded:boolean;
  senderContactName?: string;
  senderId?: string;
  senderName?: string;
  senderType:string;
  textMessage?: string;
  timestamp?: number;
  type?: string;
  typeMessage?: string;
  [property: string]: any;
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