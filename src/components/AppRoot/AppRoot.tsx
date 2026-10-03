import { type FC } from 'react';
import { Outlet } from 'react-router';
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import appLogo from '../../assets/Logo_GREEN-API.00ec17ef.svg';
import { Navbar } from '../Navbar/Navbar.tsx';
import classes from './AppRoot.module.css';


export const AppRoot: FC = () => {

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
          <img src={appLogo} className={classes.logo} alt="App logo"/>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar/>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
};