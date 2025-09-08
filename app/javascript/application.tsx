import React from "react";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';

import Rails from '@rails/ujs';
Rails.start();

const root = document.getElementById('root');

// Only attach if there's a root to attach to.
if (root) {
  createRoot(root!).render(
    <StrictMode>
        <App/>
    </StrictMode>
  );
}
