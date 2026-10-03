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
  [property: string]: any;
}