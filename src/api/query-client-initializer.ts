import { QueryClient } from '@tanstack/react-query';
import { checkAccount, deleteNotification, receiveNotification, sendMessage } from './api.ts';
import type { BaseMessagesResponse, GetChatResponse } from './api-schema.ts';
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

      await context.client.cancelQueries({ queryKey: [QueryKeys.lastMessages] });

      const timestampInSeconds = Math.floor(Date.now().valueOf() / 1000);
      const optimisticMessage: BaseMessagesResponse = {
        chatId,
        textMessage: message,
        timestamp: timestampInSeconds,
        type: 'outgoing',
        chatType: 'user',
        forwardingScore: 0,
        isForwarded: false,
        senderType: 'user',
      };

      context.client.setQueryData([QueryKeys.lastMessages], (old: BaseMessagesResponse[]) => {
        return [...(old ?? []), optimisticMessage];
      });

      return { optimisticMessage };
    },
    onSuccess: (result, _variables, onMutateResult, context) => {
      context.client.setQueryData([QueryKeys.lastMessages], (old: BaseMessagesResponse[]) => {
        return (old ?? []).map((message) =>
          (message.chatId === onMutateResult.optimisticMessage.chatId && message.textMessage === onMutateResult.optimisticMessage.textMessage)
            ? { ...message, idMessage: result.idMessage }
            : message,
        );
      });
    },
    onError: (_error, _variables, onMutateResult, context) => {
      if (!onMutateResult) {
        return;
      }

      context.client.setQueryData([QueryKeys.lastMessages], (old: BaseMessagesResponse[]) =>
        old.filter((message) =>
          !(message.chatId === onMutateResult.optimisticMessage.chatId && message.textMessage === onMutateResult.optimisticMessage.textMessage),
        ),
      );
    },
  });

  queryClient.setQueryDefaults([QueryKeys.notification], {
    queryFn: async ({ signal, client }) => {
      const notification = await receiveNotification(signal);

      if (!notification) {
        return null;
      }

      client.setQueryData([QueryKeys.lastMessages], (old: BaseMessagesResponse[] | undefined) => {
        const {
          typeWebhook,
          timestamp,
          idMessage,
          senderData,
          messageData,
        } = notification.body;
        const {
          chatId,
        } = senderData;
        const textMessage = messageData.textMessageData.textMessage;

        const type = (typeWebhook === 'incomingMessageReceived')
          ? 'incoming'
          : (typeWebhook === 'outgoingMessageReceived')
            ? 'outgoing'
            : undefined;


        const message: BaseMessagesResponse = {
          chatId,
          idMessage,
          textMessage,
          timestamp,
          type,
          chatType: '',
          forwardingScore: 0,
          isForwarded: false,
        };
        return [...(old ?? []), message];
      });

      await deleteNotification(notification.receiptId);

      return notification;
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
