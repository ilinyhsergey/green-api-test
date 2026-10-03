import type { FC } from 'react';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import classes from './PageError.module.css';

interface PageErrorProps {
  onRetry: () => void;
}

export const PageError: FC<PageErrorProps> = ({ onRetry }) => (
  <Center className={classes.error}>
    <Stack align="center" gap="xs">
      <Title order={3}>Что-то пошло не так</Title>
      <Text c="dimmed" ta="center">Не удалось загрузить данные. Попробуйте обновить.</Text>
      <Button mt="sm" onClick={onRetry}>Обновить</Button>
    </Stack>
  </Center>
);
