import type { FC } from 'react';
import { useElementSize } from '@mantine/hooks';
import classes from './Chat.module.css';
import { ChatHeader } from '../ChatHeader/ChatHeader.tsx';
import { ChatMessages } from '../ChatMessages/ChatMessages.tsx';
import { ChatInput } from '../ChatInput/ChatInput.tsx';
import { QueryKeys } from '../../api/query-keys.ts';
import { useQuery } from '@tanstack/react-query';

const NOTIFICATION_ERROR_DELAY = 5000;

export const Chat: FC = () => {
  const { ref: chatRef, height: chatHeight } = useElementSize();
  const footerMaxHeight = chatHeight ? chatHeight / 3 : undefined;

  useQuery({
    queryKey: [QueryKeys.notification],
    refetchInterval: (query) => {
      if (query.state.fetchStatus === 'fetching') {
        return false;
      }
      return query.state.status === 'error' ? NOTIFICATION_ERROR_DELAY : 1;
    },
    refetchIntervalInBackground: true,
  });


  return (
    <div className={classes.chat} ref={chatRef}>
      <ChatHeader/>

      <ChatMessages/>

      <ChatInput maxHeight={footerMaxHeight}/>
    </div>
  );
};
