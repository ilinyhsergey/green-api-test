import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getChats } from '../../api/api.ts';
import { useApiCredentials } from '../../store/credensials.store.ts';

export interface ChatsProps {
  setSelectedChatId?: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ setSelectedChatId }) => {

  const credentialsState = useApiCredentials();

  const chatsQuery = useQuery({
    queryKey: ['contacts', credentialsState],
    queryFn: getChats,
  });
  const { isPending, isError, data, error } = chatsQuery;

  if (isPending) {
    return '...'; // todo
  }

  if (isError) {
    console.error('__ error:', error); // todo
    return '---'; // todo
  }

  console.log('__ data:', data); // todo

  const links = data.data.map(({chatId, phoneNumber}) => (
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