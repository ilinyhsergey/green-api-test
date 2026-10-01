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
