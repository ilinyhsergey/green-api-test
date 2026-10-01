import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CredentialsState {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

const useCredentialsStore = create<CredentialsState>()(
  persist(
    () => ({
      apiUrl: '',
      idInstance: '',
      apiTokenInstance: '',
    }),
    {
      name: 'credentials',
      partialize: ({ apiUrl, idInstance, apiTokenInstance }) => ({ apiUrl, idInstance, apiTokenInstance }),
    },
  ),
);

const selectApiUrl = (state: CredentialsState) => state.apiUrl;
const selectIdInstance = (state: CredentialsState) => state.idInstance;
const selectApiTokenInstance = (state: CredentialsState) => state.apiTokenInstance;

export const useApiUrl = () => useCredentialsStore(selectApiUrl);
export const useIdInstance = () => useCredentialsStore(selectIdInstance);
export const useApiTokenInstance = () => useCredentialsStore(selectApiTokenInstance);

export const setApiUrl = (apiUrl: string) => {
  useCredentialsStore.setState({ apiUrl });
};
export const setIdInstance = (idInstance: string) => {
  useCredentialsStore.setState({ idInstance });
};
export const setApiTokenInstance = (apiTokenInstance: string) => {
  useCredentialsStore.setState({ apiTokenInstance });
};