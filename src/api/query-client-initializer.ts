import { QueryClient } from '@tanstack/react-query';
import { checkAccount } from './api.ts';
import type { GetChatResponse } from './api-schema.ts';
import { QueryKeys } from './query-keys.ts';


export const initializeQueryClient = (queryClient: QueryClient): QueryClient => {

  queryClient.setMutationDefaults([QueryKeys.addChat], {
    mutationFn: checkAccount,
    onSuccess: (result, _variables, _onMutateResult, context) => {
      const { chatId, phoneNumber, exist } = result;

      if (!exist) {
        return;
      }

      context.client.setQueryData([QueryKeys.chats], (old: GetChatResponse[] = []) => {
        const updateChat: GetChatResponse = { chatId, phoneNumber };

        return old.map((chat) => (
          chat.chatId === chatId ? updateChat : chat
        ));
      });
    },
  });

  return queryClient;
};