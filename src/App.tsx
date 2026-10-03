import { type FC } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { AppRouter } from './AppRouting.tsx';
import { queryClient } from './api/query-client-initializer.ts';

export const App: FC = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
      </QueryClientProvider>
    </MantineProvider>
  );
};
