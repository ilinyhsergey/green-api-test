import axios from 'axios';
import type { QueryFunctionContext } from '@tanstack/react-query';
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

// без параметров подключения запрос уходит на относительный адрес и получает index.html вместо данных
const requireCredentials = () => {
  const credentials = getCredentials();
  const { apiUrl, idInstance, apiTokenInstance } = credentials;

  if (!apiUrl || !idInstance || !apiTokenInstance) {
    throw new Error('Не заданы параметры подключения к API');
  }

  return credentials;
};

export const getContacts = async () => {
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();

  const response = await axios.get<GetContactsResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
  return response.data;
};

export const getChats = async () => {
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();

  const response = await axios.get<GetChatResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );
  return response.data;
};

export const getContactInfo = async ({ queryKey }: QueryFunctionContext) => {
  const [, data] = queryKey as [unknown, GetContactInfoRequest];
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();

  const response = await axios.post<GetContactInfoResponse>(
    `${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    data,
  );
  return response.data;
};

export const checkAccount = async (request: CheckAccountRequest) => {
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();

  const response = await axios.post<CheckAccountResponse>(
    `${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    request,
  );
  return response.data;
};

export const getLastMessages = async () => {
  const data: LastMessagesRequest = { minutes: '10080' };
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();


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
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();

  const response = await axios.post<SendMessageResponse>(
    `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    request,
  );
  return response.data;
};

export const receiveNotification = async (signal?: AbortSignal) => {
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();
  const seconds = 5;
  const response = await axios.get<NotificationResponse | null>(
    `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${seconds}`,
    { signal },
  );
  return response.data;
};

export const deleteNotification = async (receiptId: number) => {
  const { apiUrl, idInstance, apiTokenInstance } = requireCredentials();
  const response = await axios.get<DeleteNotificationResponse>(
    `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );
  return response.data;
};
