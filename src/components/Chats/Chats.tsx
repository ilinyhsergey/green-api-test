import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../api/api.ts';
import { QueryKeys } from '../../api/query-keys.ts';

export interface ChatsProps {
  setSelectedChatId?: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ setSelectedChatId }) => {

  const chatsQuery = useQuery({
    queryKey: [QueryKeys.chats],
    queryFn: getChats,
  });
  const { isPending, isError, data, error } = chatsQuery;

  if (isPending) {
    return '...'; // todo
  }

  if (isError) {
    console.error('__ error:', error);
    return '---'; // todo
  }

  const links = data.map(({chatId, phoneNumber}) => (
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