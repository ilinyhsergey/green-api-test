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