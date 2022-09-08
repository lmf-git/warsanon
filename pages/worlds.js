import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Official wrapper from Firebase organiastion to bundle style into app.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebaseConfig from 'firebaseConfig';

firebase.initializeApp(firebaseConfig);

function Worlds() {
  // Text at the top, stating purpose - you are logging in to play the game, world, username, etc.
  // It will help to explain why it is demanding a phone number.

  return (
    <div>
      <h1>Worlds</h1>
    </div>
  );
}

export default Worlds;