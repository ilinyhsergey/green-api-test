import type { FC } from 'react';
import { Box, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import classes from './ChatMessages.module.css';

interface Message { // todo remove it
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
}

const MOCK_MESSAGES: Message[] = [ // todo remove it
  { id: '1', text: 'Привет! Как дела?', time: '10:12', fromMe: false },
  { id: '2', text: 'Привет! Всё отлично, а у тебя?', time: '10:13', fromMe: true },
  { id: '3', text: 'Тоже хорошо, спасибо', time: '10:14', fromMe: false },
  { id: '4', text: 'Созвонимся сегодня?', time: '10:15', fromMe: true },
];

export const ChatMessages: FC = () => (
  <ScrollArea className={classes.body} classNames={{ content: classes.bodyContent }} offsetScrollbars>
    <Stack className={classes.messages} gap="xs" py="md">
      {MOCK_MESSAGES.map(({ id, text, time, fromMe }) => (
        <Box key={id} className={`${classes.messageRow} ${fromMe ? classes.outgoing : classes.incoming}`}>
          <Paper
            className={classes.bubble}
            radius="md"
            p="xs"
            withBorder={!fromMe}
            bg={fromMe ? 'blue.6' : undefined}
          >
            <Text size="sm" c={fromMe ? 'white' : undefined}>{text}</Text>
            <Text size="xs" c={fromMe ? 'blue.0' : 'dimmed'} ta="right">{time}</Text>
          </Paper>
        </Box>
      ))}
    </Stack>
  </ScrollArea>
);
