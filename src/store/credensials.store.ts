import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CredentialsState {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;

  setApiUrl: (apiUrl: string) => void;
  setIdInstance: (idInstance: string) => void;
  setApiTokenInstance: (apiTokenInstance: string) => void;
}

export const useCredentials = create<CredentialsState>()(
  persist(
    (set) => ({
      apiUrl: '',
      idInstance: '',
      apiTokenInstance: '',

      setApiUrl: (apiUrl: string) => set({apiUrl}),
      setIdInstance: (idInstance: string) => set({idInstance}),
      setApiTokenInstance: (apiTokenInstance: string) => set({apiTokenInstance}),
    }),
    {
      name: 'credentials',
      partialize: ({ apiUrl, idInstance, apiTokenInstance }) => ({ apiUrl, idInstance, apiTokenInstance }),
    },
  ),
)

export const selectApiUrl = (state: CredentialsState) => state.apiUrl;
export const selectIdInstance = (state: CredentialsState) => state.idInstance;
export const selectApiTokenInstance = (state: CredentialsState) => state.apiTokenInstance;

export const selectSetApiUrl = (state: CredentialsState) => state.setApiUrl;
export const selectSetIdInstance = (state: CredentialsState) => state.setIdInstance;
export const selectSetApiTokenInstance = (state: CredentialsState) => state.setApiTokenInstance;
