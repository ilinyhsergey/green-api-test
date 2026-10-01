import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { Settings } from './components/Settings/Settings.tsx';
import { Chat } from './components/Chat/Chat.tsx';
import { AppRoot } from './components/AppRoot/AppRoot.tsx';
import { NewChat } from './components/NewChat/NewChat.tsx';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppRoot/>}>
          <Route path="" element={<Navigate to="/settings" replace/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="chat" element={<Chat/>}/>
          <Route path="chat/new" element={<NewChat/>}/>
          <Route path="chat/:chatId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};