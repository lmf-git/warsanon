import React, { Component } from 'react';


import UserHelper from '../../../../../src/user/userHelper';
import PlayerData from '../../../../../src/game/player/playerData';
import DataHelper from '../../../../../utils/dataHelper';
import FirebaseHelper from '../../../../../src/auth/firebaseHelper';
import TextHelper from '../../../../../utils/textHelper';

import myTheme from '../../../../../src/style/theme';
import PageContentTitle from '../../../../../src/layout/elements/page-content-title';
import Countdown from '../../../../../src/ui/common/countdown';
import MovePopup from '../../../../../src/game/units/groups/movePopup';
import GatherPopup from '../../../../../src/game/units/groups/gatherPopup';
import BuildPopup from '../../../../../src/game/units/groups/buildPopup';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import ColorizeIcon from '@material-ui/icons/Colorize';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import BuildIcon from '@material-ui/icons/SettingsApplications';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';




const styles = theme => (Object.assign({
  wrapper: {
    padding: '1em'
  },
  commandDrawer: {
    color: '#535353'
  }
}, myTheme.common.gameEntityTable));


class UnitGroupDetailsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      unitGroup: props.unitGroup,
      worldConfig: props.worldConfig,

      commandOpen: false
    };

  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props = UserHelper.adornInitialProps(req, props);
    props.groupId = query.groupId;

    const user = UserHelper.isoGetUser(req);
    props.groupPath = PlayerData.getWorldPath(user) + 'unitGroups/' + props.groupId;
    props.unitGroup = await DataHelper.isoFetch(req, props.groupPath) || {};

    props.configPath = PlayerData.getWorldConfigPath(user);
    props.worldConfig = await DataHelper.isoFetch(req, props.configPath) || {};

    return props;
  };

  componentDidMount() {
    const groupPath = FirebaseHelper._db().ref(this.props.groupPath);
    const configPath = FirebaseHelper._db().ref(this.props.configPath);

    configPath.on('child_changed', (snapshot) => {
      const data = snapshot.val();
      const dataKey = snapshot.ref.key;
      const worldConfig = this.state.worldConfig;

      worldConfig[dataKey] = data;
      this.setState({ worldConfig });
    });

    groupPath.on('child_removed', (snapshot) => {
      // Redirect user because unit group has been destroyed/disbanded/etc
    });

    groupPath.on('child_changed', (snapshot) => {
      const data = snapshot.val();
      const dataKey = snapshot.ref.key;
      const unitGroup = this.state.unitGroup;

      unitGroup[dataKey] = data;
      this.setState({ unitGroup });
    });
  }

  componentWillUnmount() {
    FirebaseHelper._db().ref(this.props.groupPath).off();
    FirebaseHelper._db().ref(this.props.configPath).off();
  }

  // FIXME: Refactor out.
  countTotal(unitsCollection) {
    const groupIds = Object.keys(unitsCollection);
    return groupIds.length;
  }

  // FIXME: Refactor out.
  formUrlKey(key) {
    return key.replace('|', '_');
  }

  view() {
    alert('view on map');
  }

  render() {
    const { classes } = this.props;
    const unitGroup = this.state.unitGroup || {};
    const unitKeys = Object.keys(unitGroup.units);

    const coords = `${unitGroup.coords.x}|${unitGroup.coords.y}`;

    const isActionGroupOwn = () => { return true; }
    const ownUnitGroup = true;

    return (
      <>
        <SwipeableDrawer
          classes={{ paper: classes.commandDrawer }}
          anchor="bottom"
          open={this.state.commandOpen}
          onClose={() => { this.setState({ commandOpen: false }); }}
          onOpen={() => { this.setState({ commandOpen: true }); }}>
            <List>
              {/* FIXME: Add view button linking to map location. */}
              {/* <Button color="primary">Split</Button> */}
              {/* Add units to group from within maximum radius. */}
              {/* <Button color="primary">Reinforce</Button> */}

              {
                !isActionGroupOwn() && ownUnitGroup ?                         
                  <ListItem button>
                    <ListItemIcon>
                      <ColorizeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Attack'} />
                  </ListItem>
                : null
              }
              {
                isActionGroupOwn() ? 
                  <>
                    <ListItem button
                      onClick={() => { 
                        this.setState({ moveOpen: true, commandOpen: false }); 
                      }}>
                      <ListItemIcon>
                        <OpenWithIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Move'} />
                    </ListItem>

                    <ListItem button
                      onClick={() => { 
                        this.setState({ gatherOpen: true, commandOpen: false }); 
                      }}>
                      <ListItemIcon>
                        <ControlPointIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Gather'} />
                    </ListItem>

                    <ListItem button
                      onClick={() => { 
                        // parent.setDialogVisible('unitGroupsOpen', false)();
                        // this.setState({ moveOpen: true, commandOpen: false }); 
                        alert('Coming soon!');
                      }}>
                      <ListItemIcon>
                        <CompareArrowsIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Trade'} />
                    </ListItem>

                    <ListItem button
                      onClick={() => { 
                        this.setState({ buildOpen: true, commandOpen: false }); 
                      }}>
                      <ListItemIcon>
                        <BuildIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Build'} />
                    </ListItem>
                  </>
                : null
              }
            </List>

            <Divider />
        </SwipeableDrawer>


        <MovePopup
            title={'Move: Select Direction'}
            setClose={() => { 
                this.setState({ moveOpen: false }) 
            }}
            isOpen={this.state.moveOpen}
            unitGroup={unitGroup}
            groupId={this.state.groupId}
        />

        <BuildPopup
            title={'Build: Select Structure'}
            setClose={() => { 
                this.setState({ buildOpen: false }) 
            }}
            isOpen={this.state.buildOpen}
            unitGroup={this.state.group}
            groupId={this.state.groupId}
        />

        <GatherPopup
            title={'Gather: Select Activity'}
            setClose={() => { 
                this.setState({ gatherOpen: false }) 
            }}
            isOpen={this.state.gatherOpen}
            unitGroup={this.state.group}
            groupId={this.state.groupId}
        />



        <Container maxWidth="lg">
          <PageContentTitle title={`Unit Group: ${this.props.groupId}`} />
          <Paper className={classes.wrapper}>
            <div className={classes.tableContentWrapper}>
              <Typography style={{ color: 'black '}}>Location: {coords}</Typography>

              <Typography style={{ color: 'black' }}>Units:</Typography>
              {unitKeys.map(unit => {
                return <Typography key={unit} style={{ color: 'black' }}>
                  {unit}: {unitGroup.units[unit].quantity}
                </Typography>
              })}

              {typeof unitGroup.pendingEvent !== 'undefined' ? 
                <>
                  <Typography style={{ color: 'black' }}>Activity</Typography>

                  <Typography style={{ color: 'black' }}>
                    {TextHelper.titlecase(unitGroup.activity)} &nbsp;
                    <Countdown 
                      event={unitGroup.pendingEvent} 
                      worldConfig={this.state.worldConfig} 
                    />
                  </Typography> 
                </> : null
              }

              {/* FIXME: Show nearby unit groups for attacking/trading/etc */}

              {/* <>
                <Typography className={classes.emptyTable}>
                    Unit Group does not exist.
                </Typography>
              </> */}

              <div className={classes.actionsWrapper}>
                <Button onClick={this.view} color="primary">View</Button>

                <Button 
                  onClick={() => { this.setState({ commandOpen: true }); }}
                  color="primary">Command</Button>                  
              </div>
            </div>
          </Paper>
        </Container>
      </>
    );
  }

}


UnitGroupDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(UnitGroupDetailsPage);
