import { type FC, type SubmitEvent, useState } from 'react';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import classes from './ChatInput.module.css';

interface ChatInputProps {
  maxHeight?: number;
}

export const ChatInput: FC<ChatInputProps> = ({ maxHeight }) => {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setMessageText('');
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
      <ActionIcon type="submit" size="lg" variant="filled" aria-label="Отправить">
        <IconSend size={18} stroke={1.5}/>
      </ActionIcon>
    </form>
  );
};
