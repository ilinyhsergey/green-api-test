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