import { type FC, useState } from 'react';
import { Title } from '@mantine/core';
import classes from './Navbar.module.css';
import { Chats } from '../Chats/Chats.tsx';
import { MainLink } from './MainLink/MainLink.tsx';
import { IconMessage2, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router';


export const Navbar: FC = () => {
  const [active, setActive] = useState('Chats');

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <MainLink
            icon={IconMessage2}
            label="Chats"
            isActive={'Chats' === active}
            onClick={() => setActive('Chats')}
          />

          <Link to="/settings">
            <MainLink
              icon={IconSettings}
              label="Settings"
              isActive={'Settings' === active}
              onClick={() => setActive('Settings')}
            />
          </Link>
        </div>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          <Chats isVisible={active === 'Chats'}/>
        </div>
      </div>
    </nav>
  );
};