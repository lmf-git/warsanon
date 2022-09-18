import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UserHelper from '../../src/user/userHelper';
import Link from 'next/link';
import PageContentTitle from '../../src/layout/elements/page-content-title';

export default class Welcome extends Component {

  static getInitialProps({ req }) {
    const props = {};
    return UserHelper.adornInitialProps(req, props);
  };

  componentDidMount() {
    UserHelper.routeGuard();
  }

  render() {
    const user = UserHelper.getFromPropsOrCookie(this.props);
    let username = user ? user.username : null;

    return (
      <Container maxWidth="lg">
        <PageContentTitle title={'Welcome ' + username + '!'} />
        <Typography variant="h5" color="inherit" paragraph>
          If you would like to jump straight into a world, click <Link href="/game/worlds"><a>here</a></Link> or the play button in the header.
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          Thank you for registering for our game. We have statistics available <Link href="/statistics"><a>here</a></Link>, 
        and guides ready to peruse <Link href="/guide"><a>here</a></Link>.
        </Typography>
      </Container>
    );
  }

}