import firebase from 'firebase/compat/app';
import firebaseConfig from 'firebaseConfig';
import 'firebase/compat/auth';

// Official wrapper from Firebase organiastion to bundle style into app.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Layout from '@components/Layout/Layout';

import styles from '@components/Pages/Home/Home.module.css';


function Login() {
  // Auth UI needs a specific version/instance of the firebase app for some reason. Acceptable compromise.
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
      firebase.auth?.PhoneAuthProvider.PROVIDER_ID,


      // Dev only
      // 'anonymous'
    ],
  };

  return <Layout>
    <h1>Login</h1>
    <p style={{ maxWidth: '25em' }}>We use phone numbers to restrict one person to one account in our game to maximise fairness and competitivity in our game, accounts that seem to violate this will be terminated.</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  </Layout>;
}

export default Login;