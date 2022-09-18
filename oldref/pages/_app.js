import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../src/style/theme';
import Header from '../src/layout/header';
import Footer from '../src/layout/footer';
import FirebaseHelper from '../src/auth/firebaseHelper';

class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    
    FirebaseHelper.getRef().auth().onAuthStateChanged(FirebaseHelper.OnFirebaseClientsideLoad);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
        <MuiThemeProvider theme={theme}>
          <Head>
            <title>Warsanon</title>
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-auth.js"></script>
            <script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-database.js"></script>
          </Head>
          <CssBaseline />
          <div id="page-wrapper">
            {/* <Container maxWidth="lg"> */}
              <Header {...pageProps} />
              <Component {...pageProps} />
            {/* </Container> */}
            <Footer />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default MyApp;
