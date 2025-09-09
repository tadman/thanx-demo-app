import React from "react";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';

// Some UJS is needed for peripheral navigation, as Devise needs DELETE for logout
import Rails from '@rails/ujs';
Rails.start();

const root = document.getElementById('root');

import { AppStateProvider } from "./AppState";

// Only attach if there's a root to attach to, as the page might be rendered without
// needing React, such as during the login flow.
if (root) {
  createRoot(root!).render(
    <StrictMode>
      <AppStateProvider>
        <App/>
      </AppStateProvider>
    </StrictMode>
  );
}
