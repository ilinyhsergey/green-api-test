import { type FC, type SubmitEvent, useState } from 'react';
import { ActionIcon, Textarea } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import classes from './Chat.module.css';
import { ChatHeader } from '../ChatHeader/ChatHeader.tsx';
import { ChatMessages } from '../ChatMessages/ChatMessages.tsx';

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

      <ChatMessages/>

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
