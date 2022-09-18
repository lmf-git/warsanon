import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PageContentTitle from '../src/layout/elements/page-content-title';

import UserHelper from '../src/user/userHelper';

const styles = theme => ({
  root: {
    flexGrow: 1,
   },
});


class Guide extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg">
        <PageContentTitle title="Guide" />
        Add guide content.
      </Container>
    );
  }

}

Guide.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Guide);