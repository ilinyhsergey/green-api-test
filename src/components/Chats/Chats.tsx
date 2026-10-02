import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../api/api.ts';
import { useApiCredentials } from '../../store/credensials.store.ts';

export interface ChatsProps {
  setSelectedChatId?: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ setSelectedChatId }) => {

  const credentialsState = useApiCredentials();

  const contactsQuery = useQuery({
    queryKey: ['contacts', credentialsState],
    queryFn: getContacts,
  });
  const { isPending, isError, data, error } = contactsQuery;

  if (isPending) {
    return '...'; // todo
  }

  if (isError) {
    console.error('__ error:', error); // todo
    return '---'; // todo
  }


  const links = data.data.map(({chatId, contactName}) => (
    <NavLink
      to={`/chat/${chatId}`}
      className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
      key={chatId}
      onClick={() => setSelectedChatId?.(chatId)}
    >
      {contactName}
    </NavLink>
  ));

  return (
    links
  );
};