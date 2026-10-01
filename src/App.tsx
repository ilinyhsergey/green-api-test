import { type FC } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { AppRouter } from './AppRouting.tsx';

const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
      </QueryClientProvider>
    </MantineProvider>
  );
};
