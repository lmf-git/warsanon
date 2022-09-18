import React from 'react';
import Container from '@material-ui/core/Container';
import firebaseRef from '../../utils/firebase';
import { makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import PageContentTitle from '../../src/layout/elements/page-content-title';

const FirebaseAuthenticationComponent = dynamic(() => import('../../src/auth/firebaseAuthComponent'), {
  ssr: false
})


const useStyles = makeStyles(theme => ({
  loginContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '3em'
  }
}));


const Login = function() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.loginContainer}>
      <PageContentTitle title="Login" />
      <FirebaseAuthenticationComponent />
    </Container>
  );
}


Login.componentDidMount = function() {
  firebaseRef().auth().onAuthStateChanged((user) => {
  });
}


export default Login;