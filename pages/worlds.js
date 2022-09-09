import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref } from 'firebase/database';

import WorldManager from 'lib/worldManager';
import firebaseConfig from 'firebaseConfig';

import Layout from '@components/Layout/Layout';

initializeApp(firebaseConfig);

export default function Worlds() {
  const [worlds, setWorlds] = useState([])
  const router = useRouter();

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
          worlds.map(w => 
            <div 
              onClick={() => {
                WorldManager.set(w.code);
                router.push('/map');
              }}
              key={`w-${w.code}`}>
              { w.name }

              {/* Generate image for the world */}
              {/* <img src="" /> */}

              <button>
                Register
              </button>
              <button>
                Play
              </button>
            </div>
          )
        }
      </div>
    </Layout>
  );
}