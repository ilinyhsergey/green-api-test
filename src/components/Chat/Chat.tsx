import type { FC } from 'react';
import { useElementSize } from '@mantine/hooks';
import classes from './Chat.module.css';
import { ChatHeader } from '../ChatHeader/ChatHeader.tsx';
import { ChatMessages } from '../ChatMessages/ChatMessages.tsx';
import { ChatInput } from '../ChatInput/ChatInput.tsx';

export const Chat: FC = () => {
  const { ref: chatRef, height: chatHeight } = useElementSize();
  const footerMaxHeight = chatHeight ? chatHeight / 3 : undefined;

  return (
    <div className={classes.chat} ref={chatRef}>
      <ChatHeader/>

      <ChatMessages/>

      <ChatInput maxHeight={footerMaxHeight}/>
    </div>
  );
};
