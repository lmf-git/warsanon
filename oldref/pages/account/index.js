import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import UserHelper from '../../src/user/userHelper';
import PageContentTitle from '../../src/layout/elements/page-content-title';

export default class Account extends Component {

  static getInitialProps({ req }) {
    const props = {};
    return UserHelper.adornInitialProps(req, props);
  };
  
  componentDidMount() {
    // UserHelper.completionGuard();
    UserHelper.routeGuard();
  }

  // TODO: Implement
	// Change Password
	// Change Email
	// Change Username


  render() {
    const user = UserHelper.getFromPropsOrCookie(this.props);

    return (
      <Container maxWidth="lg">
        <PageContentTitle title="Account" />
        {'CONTENT'}
      </Container>
    );
  }

}