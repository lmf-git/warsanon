import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TwitterIcon from './icons/Twitter';
import FacebookIcon from './icons/Facebook';
import InstagramIcon from './icons/Instagram';

import { makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  socialTitle: {
    color: 'white'
  },
  icon: {
    margin: '0.25em',
    fontSize: '3em',
    cursor: 'pointter'
  },
}));


export default function SocialModal({ open, setOpen }) {
const classes = useStyles();
  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            backgroundColor: '#1b1b1b',
            boxShadow: 'none',
          },
        }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className={classes.socialTitle}>{"Follow"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <a href=""><TwitterIcon className={classes.icon} /></a>
            <a href=""><FacebookIcon className={classes.icon} /></a>
            <a href=""><InstagramIcon className={classes.icon} /></a>
          </DialogContentText>
        </DialogContent>
        <DialogTitle className={classes.socialTitle}>{"Share"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Adding soon.
          {/* https://stackoverflow.com/questions/7357001/share-button-post-to-wall-facebook-api */}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
