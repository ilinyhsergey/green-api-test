import { type FC, useState } from 'react';
import { ActionIcon, Title, Tooltip } from '@mantine/core';
import classes from './Navbar.module.css';
import { Chats } from '../Chats/Chats.tsx';
import { IconMessage2, IconPlus, IconSettings } from '@tabler/icons-react';
import { Link, NavLink, useNavigate } from 'react-router';


export const Navbar: FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <Tooltip
            label={'Все чаты'}
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
              aria-label={'Все чаты'}
            >
              <IconMessage2 size={22} stroke={1.5}/>
            </NavLink>
          </Tooltip>

          <Tooltip
            label={'Настройки'}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={'Settings'}
          >
            <NavLink
              to="/settings"
              className={classes.mainLink}
              aria-label={'Настройки'}
            >
              <IconSettings size={22} stroke={1.5}/>
            </NavLink>
          </Tooltip>

        </div>
        <div className={classes.main}>
          <div className={classes.header}>
            <Title order={4} className={classes.title}>
              Чаты
            </Title>

            <Tooltip
              label={'Новый чат'}
              position="left"
              withArrow
              transitionProps={{ duration: 0 }}
            >
              <Link to={'/chat/new'}>
                <ActionIcon
                  variant="light"
                  radius="xl"
                  size="lg"
                  aria-label={'Новый чат'}
                >
                  <IconPlus size={18} stroke={1.5}/>
                </ActionIcon>
              </Link>
            </Tooltip>
          </div>

          <Chats
            setSelectedChatId={(chatId) => setSelectedChatId(chatId)}
          />
        </div>
      </div>
    </nav>
  );
};