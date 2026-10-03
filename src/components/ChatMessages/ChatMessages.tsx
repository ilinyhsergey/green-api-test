import type { FC } from 'react';
import { ScrollArea, Stack } from '@mantine/core';
import classes from './ChatMessages.module.css';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../api/query-keys.ts';
import { getLastMessages } from '../../api/api.ts';
import { PageError } from '../PageError/PageError.tsx';
import { PageLoader } from '../PageLoader/PageLoader.tsx';
import { ChatMessage } from '../ChatMessage/ChatMessage.tsx';


export const ChatMessages: FC = () => {
  const params = useParams();

  const lastIncomingMessagesQuery = useQuery({
    queryKey: [QueryKeys.lastMessages],
    queryFn: getLastMessages,
  });
  const { isPending, isError, data, refetch } = lastIncomingMessagesQuery;

  if (isPending) {
    return <PageLoader/>;
  }

  if (isError) {
    return <PageError onRetry={() => refetch()}/>;
  }

  const chatId = params.chatId;

  return (
    <ScrollArea className={classes.body} classNames={{ content: classes.bodyContent }} offsetScrollbars>
      <Stack className={classes.messages} gap="xs" py="md">
        {data
          .filter((message) => message.chatId === chatId) // todo обработать в хранилище
          .map((message) => <ChatMessage key={message.idMessage} message={message}/>)}
      </Stack>
    </ScrollArea>
  );
};
