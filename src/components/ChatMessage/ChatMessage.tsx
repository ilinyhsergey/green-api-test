import type { FC } from 'react';
import { Box, Paper, Text } from '@mantine/core';
import classes from './ChatMessage.module.css';
import type { IncomingMessagesResponse } from '../../api/api-schema.ts';
import { formatTime } from '../../shared/lib/format-time.ts';

interface ChatMessageProps {
  message: IncomingMessagesResponse;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { type, textMessage, timestamp: timeInSeconds } = message;
  const isIncoming = type === 'incoming';

  return (
    <Box className={`${classes.messageRow} ${isIncoming ? classes.incoming : classes.outgoing}`}>
      <Paper
        className={classes.bubble}
        radius="md"
        p="xs"
        withBorder={isIncoming}
        bg={!isIncoming ? 'blue.6' : undefined}
      >
        <Text size="sm" c={isIncoming ? undefined : 'white'}>
          {textMessage}
        </Text>
        <Text size="xs" c={isIncoming ? 'dimmed' : 'blue.0'} ta="right">
          {formatTime(1000 * (timeInSeconds ?? 0))}
        </Text>
      </Paper>
    </Box>
  );
};
