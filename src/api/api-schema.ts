export interface GetContactsResponse {
  chatId: string;
  contactName: string;
  name: string;
  phoneNumber: number;
  type: string;
  [property: string]: any;
}