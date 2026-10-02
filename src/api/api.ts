import axios from 'axios';
import { type CredentialsState } from '../store/credensials.store.ts';
import type { CheckAccountResponse, GetChatResponse, GetContactsResponse } from './api-schema.ts';
import type { CheckAccountArguments } from './api.types.ts';

export const getContacts = async ({ queryKey }): Promise<GetContactsResponse[]> => {
  const [, credentials] = queryKey as [unknown, CredentialsState];
  const { apiUrl, idInstance, apiTokenInstance } = credentials; // todo возьми здесь из хранилища

  const response = await axios.get<GetContactsResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
  return response.data;
};

export const getChats = async ({ queryKey }): Promise<GetChatResponse[]> => {
  const [, credentials] = queryKey as [unknown, CredentialsState];
  const { apiUrl, idInstance, apiTokenInstance } = credentials; // todo возьми здесь из хранилища

  const response = await axios.get<GetChatResponse[]>(
    `${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );
  return response.data;
};

export const checkAccount = async (
  { request, credentials }: CheckAccountArguments,
): Promise<CheckAccountResponse> => {
  const { apiUrl, idInstance, apiTokenInstance } = credentials; // todo возьми здесь из хранилища
  const response = await axios.post<CheckAccountResponse>(
    `${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    request,
  );
  return response.data;
};
