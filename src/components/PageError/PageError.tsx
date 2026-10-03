import type { FC } from 'react';
import { PageMessage } from '../PageMessage/PageMessage.tsx';

interface PageErrorProps {
  onRetry: () => void;
}

export const PageError: FC<PageErrorProps> = ({ onRetry }) => (
  <PageMessage
    title="Что-то пошло не так"
    description="Не удалось загрузить данные. Попробуйте обновить."
    buttonLabel="Обновить"
    onButtonClick={onRetry}
  />
);
