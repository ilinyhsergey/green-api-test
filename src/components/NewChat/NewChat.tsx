import { type FC, type SubmitEvent, useState } from 'react';
import { Button, Paper, Stack, TextInput, Title } from '@mantine/core';

const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const NewChat: FC = () => {

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = phone.trim().replace(/[\s()-]/g, '');

    if (!PHONE_REGEX.test(normalized)) {
      setError('Введите номер телефона в международном формате, например +79991234567');
      return;
    }

    setError(null);

    const result = normalized.replace(/^\+/, '');
    console.log('__result :',result ); // todo
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} withBorder p="md" radius="md" maw={480}>
      <Stack gap="md">
        <Title order={4}>Новый чат</Title>

        <TextInput
          type={'number'}
          label="Номер телефона"
          placeholder="+79991234567"
          value={phone}
          error={error}
          onChange={(event) => {
            setPhone(event.currentTarget.value);
            if (error) {
              setError(null);
            }
          }}
        />

        <Button type="submit" disabled={!!error}>Создать чат</Button>
      </Stack>
    </Paper>
  );
};
