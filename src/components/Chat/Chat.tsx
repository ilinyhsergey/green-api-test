import { type FC, type SubmitEvent, useState } from 'react';
import { ActionIcon, Box, Paper, ScrollArea, Stack, Text, Textarea } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import classes from './Chat.module.css';
import { ChatHeader } from '../ChatHeader/ChatHeader.tsx';

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

export const Chat: FC = () => {
  const [messageText, setMessageText] = useState('');
  const { ref: chatRef, height: chatHeight } = useElementSize();
  const footerMaxHeight = chatHeight ? chatHeight / 3 : undefined;

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setMessageText('');
  };

  return (
    <div className={classes.chat} ref={chatRef}>
      <ChatHeader/>

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

      <form className={classes.footer} onSubmit={handleSubmit}>
        <Textarea
          className={classes.input}
          autosize
          minRows={1}
          placeholder="Напишите сообщение..."
          value={messageText}
          onChange={(event) => setMessageText(event.currentTarget.value)}
          styles={{ input: { maxHeight: footerMaxHeight, overflowY: 'auto' } }}
        />
        <ActionIcon type="submit" size="lg" variant="filled" aria-label="Отправить">
          <IconSend size={18} stroke={1.5}/>
        </ActionIcon>
      </form>
    </div>
  );
};
