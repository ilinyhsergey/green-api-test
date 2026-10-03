import type { FC } from 'react';
import { PageMessage } from '../PageMessage/PageMessage.tsx';

interface PageNotFoundProps {
  onGoHome: () => void;
}

export const PageNotFound: FC<PageNotFoundProps> = ({ onGoHome }) => (
  <PageMessage
    title="Страница не найдена"
    description="Такой страницы не существует или она была удалена."
    buttonLabel="Назад"
    onButtonClick={onGoHome}
  />
);
