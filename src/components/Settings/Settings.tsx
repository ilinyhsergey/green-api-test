import type { FC } from 'react';
import { Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import {
  selectApiTokenInstance,
  selectApiUrl,
  selectIdInstance,
  selectSetApiTokenInstance,
  selectSetApiUrl,
  selectSetIdInstance,
  useCredentials,
} from '../../store/credensials.store.ts';

export const Settings: FC = () => {

  const apiUrl = useCredentials(selectApiUrl);
  const idInstance = useCredentials(selectIdInstance);
  const apiTokenInstance = useCredentials(selectApiTokenInstance);
  const setApiUrl = useCredentials(selectSetApiUrl);
  const setIdInstance = useCredentials(selectSetIdInstance);
  const setApiTokenInstance = useCredentials(selectSetApiTokenInstance);


  return (
    <Paper component="form" withBorder p="md" radius="md" maw={480}>
      <Stack gap="md">
        <Title order={4}>Credentials</Title>

        <TextInput
          label="apiUrl"
          placeholder="apiUrl из настроек инстанса"
          value={apiUrl}
          onChange={(event) => setApiUrl(event.currentTarget.value)}
        />

        <TextInput
          label="idInstance"
          placeholder="idInstance из настроек инстанса"
          value={idInstance}
          onChange={(event) => setIdInstance(event.currentTarget.value)}
        />

        <PasswordInput
          label="apiTokenInstance"
          placeholder="apiTokenInstance из настроек инстанса"
          value={apiTokenInstance}
          onChange={(event) => setApiTokenInstance(event.currentTarget.value)}
        />
      </Stack>
    </Paper>
  );
};
