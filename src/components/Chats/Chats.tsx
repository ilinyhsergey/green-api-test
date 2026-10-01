import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';

const linksMockdata = [ // todo
  'Chat_1',
  'Chat_2',
  'Chat_3',
];

export interface ChatsProps {
  setSelectedChatId?: (chatId: string) => void;
}

export const Chats: FC<ChatsProps> = ({ setSelectedChatId }) => {

  const links = linksMockdata.map((link) => (
    <NavLink
      to={`/chat/${link}`}
      className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
      key={link}
      onClick={() => setSelectedChatId?.(link)}
    >
      {link}
    </NavLink>
  ));

  return (
    links
  );
};