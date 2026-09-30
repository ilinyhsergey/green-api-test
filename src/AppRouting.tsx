import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { App } from './App.tsx';
import { Settings } from './components/Settings.tsx';
import { Chats } from './components/Chats.tsx';
import { Chat } from './components/Chat.tsx';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="settings" element={<Settings/>}/>
          <Route path="chat" element={<Chats/>}/>
          <Route path="chat/:chatId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};