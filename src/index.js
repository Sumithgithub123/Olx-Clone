import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, { Firebasecontext } from './store/context';
import { Firebase } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Firebasecontext.Provider value={Firebase}>
    <Context>
    <App />
    </Context>
    </Firebasecontext.Provider>
  </React.StrictMode>
);
