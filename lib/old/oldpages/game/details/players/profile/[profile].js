import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import UserHelper from '../../../../../src/user/userHelper';
import PageContentTitle from '../../../../../src/layout/elements/page-content-title';


const styles = theme => ({
  worldsContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  worldList: {
    width: '100%',
    display: 'flex'
  },
  worldListItem: {
    background: '#0c0c0c',
    width: '33%',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  worldTileImage: {
    width: '100%',
    lineHeight: 0
  },
  actionButton: {
    marginLeft: '0.5em'
  },
  tileBar: {
    display: 'flex',
    padding: '1em',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  worldTitle: {
    fontSize: '1.25em',
    marginBottom: '0.5em'
  },
  worldActions: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto'
    },
  },
  actionIcon: {
    marginLeft: '0.25em'
  },
  infoIcon: {
  },
  joinIcon: {
    marginRight: '0.5em',
  },
});



class PlayerProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  static async getInitialProps({ req, query }) {
    let props = {};
    props.username = query.profile;
    props = UserHelper.adornInitialProps(req, props);
    return props;
  };


  render() {
    const { classes, username } = this.props;

    return (
      <Container maxWidth="lg" className={classes.worldsContainer}>
        <PageContentTitle title={`${username}`} />
          
      </Container>
    );
  }

}


export default withStyles(styles)(PlayerProfile);