import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Settings } from './components/Settings/Settings.tsx';
import { Chat } from './components/Chat/Chat.tsx';
import { AppRoot } from './components/AppRoot/AppRoot.tsx';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppRoot />}>
          <Route path="settings" element={<Settings/>}/>
          <Route path="chat/:chatId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};