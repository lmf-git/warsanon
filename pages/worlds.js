import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { child, get, getDatabase, ref, set } from 'firebase/database';

import WorldManager from 'lib/worldManager';

import Layout from '@components/Layout/Layout';

import styles from "@components/Worlds/Worlds.module.css";

export default function Worlds({ auth, account, setAccount }) {
  const router = useRouter();

  const [worlds, setWorlds] = useState({});

  // TODO: Create useUser hook to load additional data (registered worlds)

  useEffect(() => {
    const load = async () => {
      console.log('Loading');

      const world = WorldManager.get();
      
      // Load available worlds.
      const dbRef = ref(getDatabase());
      const worldsSnapshot = await get(child(dbRef, `worlds`));
      setWorlds(worldsSnapshot.val());

      // console.log(worldsSnapshot.val());
      // console.log(account);
    };

    if (auth)
      load();

  }, [auth]);

  const register = (world) => {
    const db = getDatabase();
    set(ref(db, `accounts/${auth.uid}/worlds/${world}`), true);
  }
 
  return (
    <Layout showActions={false}>
      <h1>Worlds</h1>
      <div className={styles.worlds}>
        {
          Object.keys(worlds).map(w => 
            <div 
              className={styles.world}
              key={`w-${w}`}>
              { worlds[w].name }

              {/* Generate image for the world */}
              {/* <img src="" /> */}

              {/* account */}
              { 
                !account?.worlds[w] ?
                <button className={styles.select} onClick={async () => {
                  // alert('Registering');
                  register(w);



                  console.log(account);

                  const updatedAccount = account;
                  updatedAccount.worlds[w] = true;

                  console.log(updatedAccount);

                  setAccount(updatedAccount);
                }}>
                  Register
                </button>
                :
                <button
                  onClick={() => {
                  WorldManager.set(w);
                  router.push('/map');
                }}>
                  Play
                </button>
              }

              {/* Show special if current world? */}
              {/* If currentWorld skip this page to the game? */}
            </div>
          )
        }
      </div>
    </Layout>
  );
}