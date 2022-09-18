import React, { Component } from 'react';

import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';
import PlayerData from '../../../../src/game/player/playerData';
import myTheme from '../../../../src/style/theme';
import DataHelper from '../../../../utils/dataHelper';
import FirebaseHelper from '../../../../src/auth/firebaseHelper';
import MobilisePopup from '../../../../src/game/units/groups/mobilisePopup';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';


const styles = theme => (myTheme.common.gameEntityTable);

class LocationUnitsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        units: props.units,
        mobiliseOpen: false,
    };
  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props = UserHelper.adornInitialProps(req, props);
    props.location = query.location.replace('_', '|');

    const user = UserHelper.isoGetUser(req);
    props.dataPath = PlayerData.getEntityPath(user, 'units', props.location);
    props.units = await DataHelper.isoFetch(req, props.dataPath);

    return props;
  };

  componentWillUnmount() {
    FirebaseHelper._db().ref(this.props.dataPath).off();
  }

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

  render() {
    const { classes } = this.props;
    const units = this.state.units || {};
    const unitsKeys = Object.keys(units);

    return (
      <>
        <MobilisePopup 
          entryOpen={this.state.mobiliseOpen}
          location={this.props.location}
          onClose={() => { this.setState({ mobiliseOpen: false }) }}
          units={units} />
        
        <Container maxWidth="lg">
          <PageContentTitle title={`${this.props.location} Units`} />
          <Paper>
            <div className={classes.tableContentWrapper}>
              <>
                {unitsKeys.length > 0 ? 
                  <Table className={classes.infoTable}>
                      <colgroup>
                          <col width="80%" />
                          <col width="20%" />
                      </colgroup>
                      <TableHead>
                        <TableRow>
                          <TableCell 
                            className={classes.headerCell} 
                            align="left">Type</TableCell>

                          <TableCell 
                            className={classes.headerCell} 
                            align="left">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {unitsKeys.map(unitKey => (
                          <TableRow key={unitKey}
                              className={classes.infoRow}
                              onClick={() => {} }>
                              <TableCell 
                                className={classes.rowCell}
                                align="left">
                                  {unitKey}
                              </TableCell>
                              
                              <TableCell 
                                className={classes.rowCell}
                                align="left">
                                  {units[unitKey].quantity}
                              </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                  </Table>
                  : // Else
                  <Typography className={classes.emptyTable}>
                      No units.
                  </Typography>
                }
              </>
            </div>

            <div className={classes.actionsWrapper}>
              <Button color="primary">Recruit</Button>
              { units ? 
                <Button color="primary" 
                  onClick={() => this.setState({ mobiliseOpen: true }) }>
                  Mobilise
                </Button> : null
              }
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
