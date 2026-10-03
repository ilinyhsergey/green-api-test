import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../api/api.ts';
import { QueryKeys } from '../../api/query-keys.ts';
import { Progress } from '@mantine/core';
import { useHasCredentials } from '../../store/credensials.store.ts';

export interface ChatsProps {
  setSelectedChatId?: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ setSelectedChatId }) => {
  const hasCredentials = useHasCredentials();

  const chatsQuery = useQuery({
    queryKey: [QueryKeys.chats],
    queryFn: getChats,
    enabled: hasCredentials,
  });
  const { isLoading, isError, data, error } = chatsQuery;

  if (isLoading) {
    return <Progress value={100} animated size="xs"/>;
  }

  if (isError) {
    console.error('__ error:', error);
    return '';
  }

  const links = (data ??  []).map(({chatId, phoneNumber}) => (
    <NavLink
      to={`/chat/${chatId}`}
      className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
      key={chatId}
      onClick={() => setSelectedChatId?.(chatId)}
    >
      {phoneNumber}
    </NavLink>
  ));

  return (
    links
  );
};