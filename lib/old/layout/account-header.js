import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import UserHelper from '../user/userHelper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import FirebaseHelper from '../auth/firebaseHelper';


const styles = theme => ({
  headerLinkButton: {
    textDecoration: 'none',
    color: 'green'
  }
});


class AccountHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      visible: false,
      cta: 'JOIN!',
      colour: 'primary',
      link: '/account/login'
    };

    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  buttonClickHandler() {}

  componentDidMount() {
    FirebaseHelper.getRef().auth().onAuthStateChanged((user) => {
      let state = { visible: true, cta: 'JOIN!', color: 'primary' };
      if (user) {
        state.cta = 'ACCOUNT';
        state.color = 'danger';
        state.link = '/account';
      }
      this.setState(state);
    });
  }

  render() { 
    let user = UserHelper.getFromPropsOrCookie(this.props);
    const visible = (!!user).toString();
    const { classes } = this.props;
  
    return (
      <Link href={ user ? '/game/worlds' : '/account/login' }>
        <a visible={ visible } className={classes.headerLinkButton}>
          <Button variant="outlined" color="primary" size="small" onClick={this.buttonClickHandler}>
            PLAY
          </Button>
        </a>
      </Link>
    );
  }

}


AccountHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AccountHeader);