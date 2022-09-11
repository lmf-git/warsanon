import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, getDatabase, ref } from 'firebase/database';
import firebaseConfig from 'firebaseConfig';

import '../public/global.css';

initializeApp(firebaseConfig);

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [account, setAccount] = useState(null);
    
  const dbRef = ref(getDatabase());
  useEffect(() => {
      const listener = onAuthStateChanged(getAuth(),  auth => { setAuth(auth) });

      const load = async () => {
        const accountSnapshot = await get(child(dbRef, `accounts/${auth.uid}`));
        setAccount(accountSnapshot.val());
      };

      // Load critical player data as soon as possible.
      if (auth)
        load();
      
      return () => listener();
  }, [auth]);

  return <Component auth={auth} account={account} {...pageProps} />
};