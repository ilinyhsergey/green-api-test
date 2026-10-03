import type { FC } from 'react';
import { Box, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import classes from './ChatMessages.module.css';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../api/query-keys.ts';
import { getLastIncomingMessages } from '../../api/api.ts';
import { PageError } from '../PageError/PageError.tsx';
import { PageLoader } from '../PageLoader/PageLoader.tsx';
import { formatTime } from '../../shared/lib/format-time.ts';


export const ChatMessages: FC = () => {
  const params = useParams();

  const contactInfo = useQuery({
    queryKey: [QueryKeys.lastIncomingMessages, { minutes: 10080 }],
    queryFn: getLastIncomingMessages,
  });
  const { isPending, isError, data, refetch } = contactInfo;

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
          .map((message) => {
            const { idMessage, type, textMessage, timestamp } = message;
            const isIncoming = type === 'incoming';

            return (
              <Box
                key={idMessage}
                className={`${classes.messageRow} ${isIncoming ? classes.incoming : classes.outgoing}`}
              >
                <Paper
                  className={classes.bubble}
                  radius="md"
                  p="xs"
                  withBorder={isIncoming}
                  bg={!isIncoming ? 'blue.6' : undefined}
                >
                  <Text size="sm" c={!isIncoming ? 'white' : undefined}>
                    {textMessage}
                  </Text>
                  <Text size="xs" c={!isIncoming ? 'blue.0' : 'dimmed'} ta="right">
                    {formatTime(timestamp)}
                  </Text>
                </Paper>
              </Box>
            );
          })}
      </Stack>
    </ScrollArea>
  );
};
