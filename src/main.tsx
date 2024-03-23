import WalletProviderContext from '@/contexts/WalletProvider/Wallet.provider';
import '@/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProviderContext>
      <App />
    </WalletProviderContext>
  </React.StrictMode>,
);
