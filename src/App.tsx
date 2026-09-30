import { type FC } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import './App.css';
import { AppRouter } from './AppRouting.tsx';

export const App: FC = () => {
  return (
    <MantineProvider>
      <AppRouter/>
    </MantineProvider>
  );
};
