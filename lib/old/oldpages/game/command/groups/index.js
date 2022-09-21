import React, { Component } from 'react';

import Router from 'next/router';

import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';
import PlayerData from '../../../../src/game/player/playerData';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

import ListIcon from '@material-ui/icons/List';
import VisibilityIcon from '@material-ui/icons/Visibility';
import myTheme from '../../../../src/style/theme';
import FirebaseHelper from '../../../../src/auth/firebaseHelper';
import cookie from 'cookie';
import DataHelper from '../../../../utils/dataHelper';

const styles = theme => (myTheme.common.gameEntityTable);


class CommandGroupsPage extends Component {

  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
        unitGroups: props.unitGroups
    };
  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props = UserHelper.adornInitialProps(req, props);

    const user = UserHelper.isoGetUser(req);
    props.dataPath = PlayerData.getEntityPath(user, 'unitGroups');
    props.unitGroups = await DataHelper.isoFetch(req, props.dataPath);

    return props;
  };

  componentDidMount() {
    const pathRef = FirebaseHelper._db().ref(this.props.dataPath );

    const stateHandler = (snapshot) => {
      let unitGroups = this.state.unitGroups;
      unitGroups[snapshot.ref.key] = snapshot.val();
      this.setState({ unitGroups });
    }

    pathRef.on('child_added', stateHandler);
    pathRef.on('child_changed', stateHandler);
    pathRef.on('child_removed', (snapshot) => {
      let unitGroups = this.state.unitGroups;
      delete unitGroups[snapshot.ref.key];
      this.setState({ unitGroups });
    });
  }

  countTotal(unitsCollection) {
    const groupIds = Object.keys(unitsCollection);
    return groupIds.length;
  }

  formUrlKey(key) {
    return key.replace('|', '_');
  }

  render() {
    const { classes } = this.props;
    const unitGroups = this.state.unitGroups || {};
    const groupsKeys = Object.keys(unitGroups);

    return (
        <Container maxWidth="lg">
            <PageContentTitle title="Unit Groups" />
            <Paper>
              <div className={classes.tableContentWrapper}>
                <>
                  {groupsKeys.length > 0 ? 
                    <Table className={classes.infoTable}>
                        <colgroup>
                            <col width="80%" />
                            <col width="20%" />
                            {/* <col width="10%" /> */}
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell 
                                  className={classes.headerCell}
                                  align="left">Location</TableCell>
                                <TableCell 
                                  className={classes.headerCell}
                                  align="left">Groups</TableCell>
                                <TableCell 
                                  className={classes.headerCell}
                                  align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupsKeys.map(groupKey => (
                                <TableRow key={groupKey}
                                    className={classes.infoRow}
                                    onClick={() => {} }>
                                    <TableCell align="left" className={classes.rowCell}>
                                        {groupKey}
                                    </TableCell>
                                    <TableCell align="left" className={classes.rowCell}>
                                        {this.countTotal(unitGroups[groupKey])}
                                    </TableCell>
                                    <TableCell align="right" className={classes.rowCell}>
                                        <IconButton onClick={() => { 
                                            Router.push(
                                              '/game/location/groups/[location]',
                                              '/game/location/groups/' + this.formUrlKey(groupKey)
                                            );
                                          }}>
                                          <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : // Else
                    <Typography className={classes.emptyTable}>
                        No Unit Groups.
                    </Typography>
                  }
                </>
                </div>
            </Paper>
        </Container>
    );
  }

}


CommandGroupsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CommandGroupsPage);
