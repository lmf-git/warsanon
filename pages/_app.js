import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from 'firebaseConfig';

import AccountManager from 'lib/accountManager';
import AuthManager from 'lib/authManager';

import Context from '@components/Context';

import '../public/global.css';

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [account, setAccount] = useState(null);
  const contextValue = { auth, account, setAccount, setAuth };

  // Subscribe to authentication changes to show user visually.
  useEffect(() => AuthManager.subscribe(setAuth), [auth]);

  // Turn the loadEffect into a hook so this is cleaner.
  // Load the user's account so we know what worlds they're registered to, who they are, etc.
  useEffect(() => AccountManager.initialise(auth, setAccount), [auth]);
  
  return <Context.Provider value={contextValue}>
    <Component {...pageProps} />
  </Context.Provider>
};