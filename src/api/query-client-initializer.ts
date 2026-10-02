import { QueryClient } from '@tanstack/react-query';
import { checkAccount } from './api.ts';
import type { GetChatResponse } from './api-schema.ts';
import { QueryKeys } from './query-keys.ts';
import { getCredentials } from '../store/credensials.store.ts';


export const initializeQueryClient = (queryClient: QueryClient): QueryClient => {

  queryClient.setMutationDefaults([QueryKeys.addChat], {
    mutationFn: checkAccount,
    onSuccess: (result, _variables, onMutateResult, context) => {
      const { chatId, phoneNumber, exist } = result;
      const queryKey = [QueryKeys.chats, getCredentials()];

      if (exist) {
        const updateChat: GetChatResponse = { chatId, phoneNumber };

        context.client.setQueryData(queryKey, (old: GetChatResponse[] = []) => {
          return old.map((chat) => (
            chat.chatId === chatId ? updateChat : chat
          ));
        });
      }
    },
  });

  return queryClient;
};