import { QueryClient } from '@tanstack/react-query';
import { checkAccount, sendMessage } from './api.ts';
import type { GetChatResponse, LastIncomingMessagesResponse } from './api-schema.ts';
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

  queryClient.setMutationDefaults([QueryKeys.sendMessage], {
    mutationFn: sendMessage,
    onMutate: async (variables, context) => {
      const { chatId, message } = variables;

      await context.client.cancelQueries({ queryKey: [QueryKeys.lastIncomingMessages] });

      const optimisticMessage: LastIncomingMessagesResponse = {
        chatId,
        textMessage: message,
        timestamp: Date.now().valueOf(),
        type: 'outgoing',
        chatType: 'user',
        forwardingScore: 0,
        isForwarded: false,
        senderType: 'user',
      };

      context.client.setQueryData([QueryKeys.lastIncomingMessages], (old: LastIncomingMessagesResponse[]) => {
        return [...(old ?? []), optimisticMessage];
      });

      return { optimisticMessage };
    },
    onSuccess: (result, _variables, onMutateResult, context) => {
      context.client.setQueryData([QueryKeys.lastIncomingMessages], (old: LastIncomingMessagesResponse[]) =>
        (old ?? []).map((message) =>
          (message.chatId === onMutateResult.optimisticMessage.chatId && message.textMessage === onMutateResult.optimisticMessage.textMessage)
            ? { ...message, idMessage: result.idMessage }
            : message,
        ),
      );
    },
    onError: (_error, _variables, onMutateResult, context) => {
      if (!onMutateResult) {
        return;
      }

      context.client.setQueryData([QueryKeys.lastIncomingMessages], (old: LastIncomingMessagesResponse[]) =>
        old.filter((message) =>
          !(message.chatId === onMutateResult.optimisticMessage.chatId && message.textMessage === onMutateResult.optimisticMessage.textMessage),
        ),
      );
    },
  });

  return queryClient;
};

export const queryClient = initializeQueryClient(new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
}));
