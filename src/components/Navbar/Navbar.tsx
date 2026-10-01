import { type FC, useState } from 'react';
import { Tooltip } from '@mantine/core';
import classes from './Navbar.module.css';
import { Chats } from '../Chats/Chats.tsx';
import { IconMessage2, IconSettings } from '@tabler/icons-react';
import { NavLink, useNavigate } from 'react-router';


export const Navbar: FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>

          <Tooltip
            label={'Chats'}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={'Chats'}
          >
            <NavLink
              to={'/chat'}
              onClick={(e) => {
                e.preventDefault();
                navigate(selectedChatId ? `/chat/${selectedChatId}` : '/chat');
              }}
              className={classes.mainLink}
              aria-label={'Chats'}
            >
              <IconMessage2 size={22} stroke={1.5}/>
            </NavLink>
          </Tooltip>

          <Tooltip
            label={'Settings'}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={'Settings'}
          >
            <NavLink
              to="/settings"
              className={classes.mainLink}
              aria-label={'Settings'}
            >
              <IconSettings size={22} stroke={1.5}/>
            </NavLink>
          </Tooltip>

        </div>
        <div className={classes.main}>
          <Chats
            setSelectedChatId={(chatId) => setSelectedChatId(chatId)}
          />
        </div>
      </div>
    </nav>
  );
};