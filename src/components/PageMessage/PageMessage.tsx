import type { FC } from 'react';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import classes from './PageMessage.module.css';

interface PageMessageProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export const PageMessage: FC<PageMessageProps> = ({ title, description, buttonLabel, onButtonClick }) => (
  <Center className={classes.message}>
    <Stack align="center" gap="xs">
      <Title order={3}>{title}</Title>
      <Text c="dimmed" ta="center">{description}</Text>
      <Button mt="sm" onClick={onButtonClick}>{buttonLabel}</Button>
    </Stack>
  </Center>
);
