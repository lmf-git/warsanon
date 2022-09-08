import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Official wrapper from Firebase organiastion to bundle style into app.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebaseConfig from 'firebaseConfig';

import Layout from '@components/Layout/Layout';

import styles from '@components/Home/Home.module.css';

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccess: () => { alert('testing'); return false; },
  signInSuccessUrl: '/worlds',

  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function Login() {
  // Text at the top, stating purpose - you are logging in to play the game, world, username, etc.
  // It will help to explain why it is demanding a phone number.

  return <Layout>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </Layout>;
}

export default Login;