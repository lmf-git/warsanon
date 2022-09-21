import React, { Component } from 'react';

import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';
import PlayerData from '../../../../src/game/player/playerData';
import UnitGroupsHelper from '../../../../src/game/units/groups/helper';

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

import VisibilityIcon from '@material-ui/icons/Visibility';
import Router from 'next/router';

import myTheme from '../../../../src/style/theme';
import DataHelper from '../../../../utils/dataHelper';
import FirebaseHelper from '../../../../src/auth/firebaseHelper';
import TextHelper from '../../../../utils/textHelper';


const styles = theme => (myTheme.common.gameEntityTable);


class LocationUnitsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        groups: props.groups,
        dirSelectOpen: false,
        selectedUnits: {},
        selectedDirection: ''
    };
  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props.location = query.location.replace('_', '|');
    props = UserHelper.adornInitialProps(req, props);

    const user = UserHelper.isoGetUser(req);
    props.dataPath = PlayerData.getEntityPath(user, 'unitGroups', props.location);

    props.groups = await DataHelper.isoFetch(req, props.dataPath);

    return props;
  };

  componentWillUnmount() {
    FirebaseHelper._db().ref(this.props.dataPath).off();
  }

  componentDidMount() {
    const pathRef = FirebaseHelper._db().ref(this.props.dataPath);

    const stateHandler = (snapshot) => {
      let groups = this.state.groups;
      groups[snapshot.ref.key] = snapshot.val();
      this.setState({ groups });
    }

    pathRef.on('child_added', stateHandler);
    pathRef.on('child_changed', stateHandler);
    pathRef.on('child_removed', (snapshot) => {
      let groups = this.state.groups;
      delete groups[snapshot.ref.key];
      this.setState({ groups });
    });
  }

  goTo(groupId) {
    Router.push(
      '/game/command/groups/details/[groupId]',
      '/game/command/groups/details/' + groupId,
    )
  }

  render() {
    const { classes } = this.props;
    const groups = this.state.groups || {};
    const groupsKeys = Object.keys(groups);

    const tc = TextHelper.titlecase;

    return (
      <>       
        <Container maxWidth="lg">
            <PageContentTitle title={`${this.props.location} Unit Groups`} />
            <Paper>
              <div className={classes.tableContentWrapper}>
                <>
                  {groupsKeys.length > 0 ? 
                  <Table className={classes.infoTable}>
                      <colgroup>
                          <col width="40%" />
                          <col width="30%" />
                          <col width="20%" />
                          <col width="10%" />
                      </colgroup>
                      <TableHead className={classes.header}>
                          <TableRow>
                              <TableCell 
                                className={classes.headerCell} 
                                align="left">Group</TableCell>

                              <TableCell 
                                className={classes.headerCell} 
                                align="left">Status</TableCell>

                              <TableCell 
                                className={classes.headerCell} 
                                align="left">Units</TableCell>

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
                                      { tc(groups[groupKey].activity || 'Idle')}
                                  </TableCell>
                                  <TableCell align="left" className={classes.rowCell}>
                                      {UnitGroupsHelper.countUnits(groups[groupKey])}
                                  </TableCell>
                                  <TableCell align="right" className={classes.rowCell}>
                                    <IconButton onClick={() => { this.goTo(groupKey); }}>
                                      <VisibilityIcon />
                                    </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
                  : // Else
                  <Typography className={classes.emptyTable}>
                      No unit groups.
                  </Typography>
                  }
                </>
              </div>
            </Paper>
        </Container>
      </>
    );
  }

}


LocationUnitsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(LocationUnitsPage);
