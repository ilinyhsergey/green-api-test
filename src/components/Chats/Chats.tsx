import { type FC } from 'react';
import classes from './Chats.module.css';
import { NavLink } from 'react-router';

const linksMockdata = [ // todo
  'Chat_1',
  'Chat_2',
  'Chat_3',
];

export interface ChatsProps {
  isVisible: boolean;
}

export const Chats: FC<ChatsProps> = ({ isVisible }) => {

  const links = isVisible && linksMockdata.map((link) => (
    <NavLink
      to={`/chat/${link}`}
      className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
      key={link}
    >
      {link}
    </NavLink>
  ));

  return (
    links
  );
};