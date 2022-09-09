import firebase from 'firebase/compat/app';

import firebaseConfig from 'firebaseConfig';
import Layout from '@components/Layout/Layout';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { child, get, getDatabase, ref } from 'firebase/database';

firebase.initializeApp(firebaseConfig);

export default function Worlds() {

  const [worlds, setWorlds] = useState([])

  useEffect(() => {
    const load = async () => {
      initializeApp(firebaseConfig);
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, `worlds`));
      setWorlds(snapshot.val())
    };
    load();
  });
 
  return (
    <Layout showActions={false}>
      <h1>Worlds</h1>

      <div>
        { 
          worlds.map((w, wI) => 
            <div 
              onClick={() => {
                console.log('Set current world');
                localStorage.setItem('currentWorld', w.code);
              }}
              key={`w-${w.code}`}>
              { w.name }
            </div>
          )
        }
      </div>
    </Layout>
  );
}