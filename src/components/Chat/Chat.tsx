import { type FC, type SubmitEvent, useState } from 'react';
import { ActionIcon, Avatar, Box, Group, Paper, ScrollArea, Stack, Text, Textarea } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconDotsVertical, IconSend } from '@tabler/icons-react';
import classes from './Chat.module.css';
import { getContactInfo } from '../../api/api.ts';
import { QueryKeys } from '../../api/query-keys.ts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { formatTime } from '../../shared/lib/format-time.ts';
import { PageLoader } from '../PageLoader/PageLoader.tsx';
import { PageError } from '../PageError/PageError.tsx';

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
  const params = useParams();

  const contactInfo = useQuery({
    queryKey: [QueryKeys.currentContactInfo, { chatId: params.chatId }],
    queryFn: getContactInfo,
  });
  const { isPending, isError, data, refetch } = contactInfo;

  const [messageText, setMessageText] = useState('');
  const { ref: chatRef, height: chatHeight } = useElementSize();
  const footerMaxHeight = chatHeight ? chatHeight / 3 : undefined;

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setMessageText('');
  };

  if (isPending) {
    return <PageLoader/>;
  }

  if (isError) {
    return <PageError onRetry={() => refetch()}/>;
  }

  return (
    <div className={classes.chat} ref={chatRef}>
      <div className={classes.header}>
        <Group gap="sm">
          <Avatar src={data?.avatar} radius="xl"/>
          <Stack gap={0}>
            <Text fw={500}>{data?.contactName}</Text>
            {!!data?.lastSeen &&
              <Text size="xs" c="dimmed">был(а) в сети {formatTime(data?.lastSeen)}</Text>
            }
          </Stack>
        </Group>

        <ActionIcon variant="subtle" size="lg" aria-label="Меню чата">
          <IconDotsVertical size={20} stroke={1.5}/>
        </ActionIcon>
      </div>

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
