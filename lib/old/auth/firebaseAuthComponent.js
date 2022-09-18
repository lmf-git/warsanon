import React, { Component } from 'react';
import firebaseRef from '../../utils/firebase';
import Router from 'next/router';
import UserHelper from '../user/userHelper';

// TODO: Upgrade anonymous accounts!!!!!! This would be a great feature.
const signInSuccessHandler = async function(userAuthResponse) {
  const uid = firebaseRef().auth().currentUser.uid;
  const isNewUser = userAuthResponse.additionalUserInfo.isNewUser;
  UserHelper.setAuthTokenCookie(userAuthResponse.user._lat);
 
  // TODO: Cut multiaccounts - like username check? https://fingerprintjs.com/
  if (!isNewUser) {
    const user = await UserHelper.getByUid(uid);
    if (user) {
      UserHelper.setUserCookie(user);
      Router.push('/account');
    }

  } else {
    Router.push('/account/complete');
  } 

};


export default class FirebaseAuthenticationComponent extends Component {

  componentDidMount() {

    const signInProviders = [
      firebaseRef().auth.GoogleAuthProvider.PROVIDER_ID,
      // firebaseRef().auth.FacebookAuthProvider.PROVIDER_ID,
      // firebaseRef().auth.TwitterAuthProvider.PROVIDER_ID,
      firebaseRef().auth.EmailAuthProvider.PROVIDER_ID,
      // firebaseRef().auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ];

    firebaseRef().auth().onAuthStateChanged((user) => {
        const uiConfig = {
            callbacks: {
              signInSuccessWithAuthResult: signInSuccessHandler
            },
            signInFlow: 'popup',
            signInOptions: signInProviders,
            tosUrl: '<your-tos-url>',
            privacyPolicyUrl: function() {
              window.location.assign('<your-privacy-policy-url>');
            }
          };

        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {    
            ui = new firebaseui.auth.AuthUI(firebaseRef().auth());
        }

        ui.start('#firebase-auth', uiConfig);
    });
  }

  render() {
    return (
      <div id="firebase-auth"></div>
    );
  }
}