import { type FC, type SubmitEvent, useState } from 'react';
import { Button, Paper, Stack, TextInput, Title } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { QueryKeys } from '../../api/query-keys.ts';
import { useNavigate } from 'react-router';
import type { CheckAccountRequest, CheckAccountResponse } from '../../api/api-schema.ts';

const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const NewChat: FC = () => {
  const navigate = useNavigate();
  const checkAccountMutation = useMutation<CheckAccountResponse, unknown, CheckAccountRequest, unknown>({
    mutationKey: [QueryKeys.addChat],
  });

  const { isPending, isError, isSuccess } = checkAccountMutation;

  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = phone.trim().replace(/[\s()-]/g, '');

    if (!PHONE_REGEX.test(normalized)) {
      setValidationError('Введите номер телефона в международном формате, например +79991234567');
      return;
    }

    setValidationError(null);

    const phoneNumber = normalized.replace(/^\+/, '');

    checkAccountMutation.mutateAsync({ phoneNumber: +phoneNumber })
      .then(({ chatId, exist }) => {
        if (exist) {
          navigate(`/chat/${chatId}`);
        }
      });

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
          error={validationError}
          onChange={(event) => {
            setPhone(event.currentTarget.value);
            if (validationError) {
              setValidationError(null);
            }
          }}
        />

        <Button type="submit" disabled={isError || isPending || isSuccess}>Создать чат</Button>
      </Stack>
    </Paper>
  );
};
