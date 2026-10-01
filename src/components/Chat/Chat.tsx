import type { FC } from 'react';
import { useParams } from 'react-router';

export const Chat: FC = () => {
  const params = useParams();

  if (!params.chatId) {
    return (
      <p>Нет выбранных чатов</p>
    );
  }

  return (
    <p>Chat: {params.chatId}</p>
  );
};