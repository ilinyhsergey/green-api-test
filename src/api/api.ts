import axios from 'axios';
import { getCredentials } from '../store/credensials.store.ts';
import type {
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  GetChatResponse,
  GetContactInfoRequest,
  GetContactInfoResponse,
  GetContactsResponse,
  IncomingMessagesResponse,
  LastMessagesRequest,
  NotificationResponse,
  OutgoingMessagesResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './api-schema.ts';

export const getContacts = async () => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.get<GetContactsResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
  return response.data;
};

export const getChats = async () => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.get<GetChatResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );
  return response.data;
};

export const getContactInfo = async ({ queryKey }) => {
  const [, data] = queryKey as [unknown, GetContactInfoRequest];
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.post<GetContactInfoResponse>(
    `${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    data,
  );
  return response.data;
};

export const checkAccount = async (request: CheckAccountRequest) => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.post<CheckAccountResponse>(
    `${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    request,
  );
  return response.data;
};

export const getLastMessages = async ({ queryKey }) => {
  const data: LastMessagesRequest = { minutes: '10080' };
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();


  const incomingPromise = axios.get<IncomingMessagesResponse[]>(
    `${apiUrl}/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
    { data },
  );
  const outgoingPromise = axios.get<OutgoingMessagesResponse[]>(
    `${apiUrl}/waInstance${idInstance}/lastOutgoingMessages/${apiTokenInstance}`,
    { data },
  );

  const [incomingResponse, outgoingResponse] = await Promise.all([incomingPromise, outgoingPromise]);

  return [...incomingResponse.data, ...outgoingResponse.data]
    .sort((a, b) => {
      if (!a.timestamp || !b.timestamp) {
        return 0;
      }
      return a.timestamp - b.timestamp;
    });
};

export const sendMessage = async (request: SendMessageRequest) => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.post<SendMessageResponse>(
    `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    request,
  );
  return response.data;
};

export const receiveNotification = async () => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();
  const seconds = 30; // todo только для разработки
  const response = await axios.get<NotificationResponse>(
    `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${seconds}`,
  );
  return response.data;
};

export const deleteNotification = async (receiptId: number) => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();
  const response = await axios.get<DeleteNotificationResponse>(
    `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );
  return response.data;
};
