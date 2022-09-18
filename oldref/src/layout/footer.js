import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  footer: {
    paddingTop: '7.5em',
    paddingBottom: '2.5em'
  }
}));


export default function Footer() {
  const classes = useStyles();

  return ('');
        // <footer className={classes.footer}>
        //   <Container maxWidth="lg">
        //     <Typography variant="h6" align="center" gutterBottom>
        //         Footer
        //     </Typography>
        //     <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        //         Something here to give the footer a purpose!
        //     </Typography>
        //   </Container>
        // </footer>
  
}



