import axios from 'axios';
import { getCredentials } from '../store/credensials.store.ts';
import type { CheckAccountRequest, CheckAccountResponse, GetChatResponse, GetContactsResponse } from './api-schema.ts';

export const getContacts = async (): Promise<GetContactsResponse[]> => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.get<GetContactsResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
  return response.data;
};

export const getChats = async (): Promise<GetChatResponse[]> => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.get<GetChatResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );
  return response.data;
};

export const checkAccount = async (request: CheckAccountRequest): Promise<CheckAccountResponse> => {
  const { apiUrl, idInstance, apiTokenInstance } = getCredentials();

  const response = await axios.post<CheckAccountResponse>(
    `${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    request,
  );
  return response.data;
};
