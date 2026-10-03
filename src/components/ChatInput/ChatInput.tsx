import { type FC, type SubmitEvent, useState } from 'react';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import classes from './ChatInput.module.css';
import { useMutation } from '@tanstack/react-query';
import type { SendMessageRequest, SendMessageResponse } from '../../api/api-schema.ts';
import { QueryKeys } from '../../api/query-keys.ts';
import { useNavigate, useParams } from 'react-router';
import { PageNotFound } from '../PageNotFound/PageNotFound.tsx';

interface ChatInputProps {
  maxHeight?: number;
}

export const ChatInput: FC<ChatInputProps> = ({ maxHeight }) => {
  const [messageText, setMessageText] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const chatId = params.chatId;

  const sendMessageMutation = useMutation<SendMessageResponse, unknown, SendMessageRequest>({
    mutationKey: [QueryKeys.sendMessage],
  });

  const { isPending, isError } = sendMessageMutation;

  if (!chatId) {
    return <PageNotFound onGoHome={() => navigate(-1)}/>;
  }

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (!messageText) {
      return;
    }

    const request: SendMessageRequest = {
      chatId,
      message: messageText,
    };

    sendMessageMutation.mutateAsync(request)
      .then((response) => {
        console.log('__ response:', response); // todo
        setMessageText('');
      });
  };

  return (
    <form className={classes.footer} onSubmit={handleSubmit}>
      <Textarea
        className={classes.input}
        autosize
        minRows={1}
        placeholder="Напишите сообщение..."
        value={messageText}
        onChange={(event) => setMessageText(event.currentTarget.value)}
        styles={{ input: { maxHeight, overflowY: 'auto' } }}
      />
      <ActionIcon
        disabled={isPending || isError}
        type="submit"
        size="lg"
        variant="filled"
        aria-label="Отправить"
      >
        <IconSend size={18} stroke={1.5}/>
      </ActionIcon>
    </form>
  );
};
