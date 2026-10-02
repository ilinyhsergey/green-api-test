import axios, { type AxiosResponse } from 'axios';
import { type CredentialsState } from '../store/credensials.store.ts';
import type { GetContactsResponse } from './api-schema.ts';

export const getContacts = async ({ queryKey }): Promise<AxiosResponse<GetContactsResponse[]>> => {
  const [, credentials] = queryKey;
  const {apiUrl, idInstance, apiTokenInstance} = credentials as CredentialsState;

  return await axios.get(
    `${apiUrl}/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
  );
};
