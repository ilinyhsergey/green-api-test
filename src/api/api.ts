import axios, { type AxiosResponse } from 'axios';
import { type CredentialsState } from '../store/credensials.store.ts';
import type { GetChatResponse, GetContactsResponse } from './api-schema.ts';

export const getContacts = async ({ queryKey }): Promise<AxiosResponse<GetContactsResponse[]>> => {
  const [, credentials] = queryKey;
  const {apiUrl, idInstance, apiTokenInstance} = credentials as CredentialsState;

  return await axios.get(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
};

export const getChats = async ({ queryKey }): Promise<AxiosResponse<GetChatResponse[]>> => {
  const [, credentials] = queryKey;
  const {apiUrl, idInstance, apiTokenInstance} = credentials as CredentialsState;

  return await axios.get(
    `${apiUrl}/waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );
};
