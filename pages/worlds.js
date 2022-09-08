import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from 'firebaseConfig';
import Layout from '@components/Layout/Layout';

firebase.initializeApp(firebaseConfig);

export default function Worlds() {
  // Text at the top, stating purpose - you are logging in to play the game, world, username, etc.
  // It will help to explain why it is demanding a phone number.

  return (
    <Layout>
      <h1>Worlds</h1>
    </Layout>
  );
}