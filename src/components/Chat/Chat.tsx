import type { FC } from 'react';
import { useParams } from 'react-router';

export const Chat: FC = () => {
  const params = useParams();

  return (
    <p>Chat: {params.chatId}</p>
  );
};