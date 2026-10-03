import type { FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../api/query-keys.ts';
import { getContactInfo } from '../../api/api.ts';

export const Chat: FC = () => {
  const params = useParams();

  const contactInfo = useQuery({
    queryKey: [QueryKeys.currentContactInfo, { chatId: params.chatId }],
    queryFn: getContactInfo,
  });
  const { isPending, isError, data, error } = contactInfo;

  if (!params.chatId) {
    return (
      <p>Нет выбранных чатов</p>
    );
  }

  if (isPending) {
    return '...';
  }

  if (isError) {
    console.error('__ error:', error);
    return '---'; // todo
  }

  return (
    <pre>Chat: {JSON.stringify(data, null, 2)}</pre>
  );
};