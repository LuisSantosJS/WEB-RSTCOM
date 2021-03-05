import React from 'react';
import ReactDOM from 'react-dom';
import RouterMain from './routes';
import ProviderAuth from './context/auth'
import { ToastProvider } from 'react-toast-notifications';
import './css/index.module.scss'

ReactDOM.render(

  <ProviderAuth>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
    >
      <RouterMain />
    </ToastProvider>
  </ProviderAuth>,

  document.getElementById('root')
);
