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
import DataHelper from '../../../../utils/dataHelper';
import FirebaseHelper from '../../../../src/auth/firebaseHelper';


const styles = theme => (myTheme.common.gameEntityTable);



class ManageUnitsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        units: props.units
    };
  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props = UserHelper.adornInitialProps(req, props);

    const user = UserHelper.isoGetUser(req);
    props.dataPath = PlayerData.getEntityPath(user, 'units');
    props.units = await DataHelper.isoFetch(req, props.dataPath);

    return props;
  };

  componentDidMount() {
    const pathRef = FirebaseHelper._db().ref(this.props.dataPath);

    const stateHandler = (snapshot) => {
      let units = this.state.units;
      units[snapshot.ref.key] = snapshot.val();
      this.setState({ units });
    }

    pathRef.on('child_added', stateHandler);
    pathRef.on('child_changed', stateHandler);
    pathRef.on('child_removed', (snapshot) => {
      let units = this.state.units;
      delete units[snapshot.ref.key];
      this.setState({ units });
    });
  }

  componentWillUnmount() {
    const user = UserHelper.getUserFromCookie();
    const path = PlayerData.getEntityPath(user, 'units');
    FirebaseHelper._db().ref(path).off();
  }

  countTotal(unitsCollection) {
    let total = 0;
    const unitIds = Object.keys(unitsCollection);
    unitIds.forEach(unit => {
      total += unitsCollection[unit].quantity;
    });  
    return total;
  }

  formUrlKey(key) {
    return key.replace('|', '_');
  }

  render() {
    const { classes } = this.props;
    const units = this.state.units || {};
    const unitsKeys = Object.keys(units);

    return (
        <Container maxWidth="lg">
            <PageContentTitle title="Units" />
            <Paper>
              <div className={classes.tableContentWrapper}>
                <>
                  {unitsKeys.length > 0 ? 
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
                                  align="left">Quantity</TableCell>
                                <TableCell 
                                  className={classes.headerCell}
                                  align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {unitsKeys.map(unitKey => (
                                <TableRow key={unitKey}
                                    className={classes.infoRow}
                                    onClick={() => {} }>
                                    <TableCell align="left" className={classes.rowCell}>
                                        {unitKey}
                                    </TableCell>
                                    <TableCell align="left" className={classes.rowCell}>
                                        {this.countTotal(units[unitKey])}
                                    </TableCell>
                                    <TableCell align="right" className={classes.rowCell}>
                                        <IconButton onClick={() => { 
                                          Router.push(
                                            '/game/location/units/[location]',
                                            '/game/location/units/' + this.formUrlKey(unitKey)
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
                    <Typography style={{ padding: '1em', textAlign: 'center', fontWeight: 'bold', color: '#d50002' }}>
                      No units.
                    </Typography>
                  }
                </>
                </div>
            </Paper>
        </Container>
    );
  }

}


ManageUnitsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(ManageUnitsPage);
