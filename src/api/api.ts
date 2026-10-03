import axios from 'axios';
import { getCredentials } from '../store/credensials.store.ts';
import type {
  CheckAccountRequest,
  CheckAccountResponse,
  GetChatResponse,
  GetContactInfoRequest,
  GetContactInfoResponse,
  GetContactsResponse,
  LastIncomingMessagesRequest,
  LastIncomingMessagesResponse,
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

export const getLastIncomingMessages = async ({ queryKey }) => {
  const [, data] = queryKey as [unknown, LastIncomingMessagesRequest];
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();
  const response = await axios.get<LastIncomingMessagesResponse[]>(
    `${apiUrl}/waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
    { data },
  );
  return response.data;
};
