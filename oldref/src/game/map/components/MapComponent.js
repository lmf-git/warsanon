import React, { Component } from 'react';
import { throttleTime } from 'rxjs/operators/throttleTime';
import Router from 'next/router';

import MapApplication from '../mapApplication';
import MapData from '../mapData';
import CoordinateOverview from '../dialog/coord/coordinateOverview';
import BiomeInfo from '../dialog/coord/biomeInfo';
import EditCoordinateField from '../dialog/coord/editCoordinateField';

import theme from '../../../style/theme';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';
import DetailsIcon from '@material-ui/icons/Details';
import HelpIcon from '@material-ui/icons/Help';
import PageViewIcon from '@material-ui/icons/Pageview';

import UnitGroupsInfo from '../dialog/coord/unitGroupsInfo';
import ItemInfo from '../dialog/coord/itemInfo';
import StructureInfo from '../dialog/coord/structureInfo';
import SpawnSelect from '../dialog/spawnSelect';
import PlayersInfo from '../dialog/coord/playersInfo';
import ZoomDialog from '../dialog/zoomDialog';
import HelpDialog from '../dialog/helpDialog';

import UserHelper from '../../../user/userHelper';
import FirebaseHelper from '../../../auth/firebaseHelper';
import CoordinateHelper from '../helper/coordinateHelper';


const styles = () => ({
  infoBox: {
    position: 'absolute',
    padding: '1em',
    background: '#1b1b1bcc',
    userSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    padding: '1.25em',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5em'
    },
  },
  mapInfoContainer: {
    top: 0,
    right: 0,
    borderRadius: '0 0 0 1em',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  actionsInfoContainer: {
    bottom: 0,
    right: 0,
    borderRadius: '1em 0 0 0em',
    display: 'flex',
    flexDirection: 'column',
  },
  actionButton: {
    padding: '0.5em',
    [theme.breakpoints.up('sm')]: {
      padding: '1em',
    },
    color: 'white',
    cursor: 'pointer'
  },
  infoDialog: {},
  infoDialogHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.25em 0.5em',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  infoDialogHeaderClose: {
    marginLeft: 'auto'
  },
  infoDialogHeaderTitle: {
    fontSize: '1.35em',
    fontWeight: '500'
  },
  infoDialogContent: {
    padding: '0.25em',
    background: '#ffffffbf'
  },
  infoDialogPaper: {
    background: 'transparent',
    minWidth: '50%'
  },
  infoActions: {
    textAlign: 'right',
    paddingTop: '0.5em',
  },
  infoActionButtonIcon: {
    marginLeft: '0.25em'
  },
  infoTable: {
    marginBottom: '0.5em'
  },
  infoRow: {
    cursor: 'pointer'
  },
  infoEmpty: {
    padding: '1em', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#d50002'
  },
  tableContentWrapper: {
    maxHeight: '30em',
    overflow: 'auto'
  }
});


class MapComponent extends Component {

  static async getInitialProps({ req }) {
    let props = {};
    props = UserHelper.adornInitialProps(req, props);
    
    return props;
  };

  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: '',
      uiVisible: false,

      // DIALOGS
      infoOpen: false,
      biomeOpen: false,
      unitGroupsOpen: false,
      itemsInfoOpen: false,
      playersInfoOpen: false,
      structureInfoOpen: false,
      editCoordinateOpen: false,
      zoomDialogOpen: false,
      helpDialogOpen: false,

      // TEMPORARY
      spawnSelectOpen: false
    };

    this.detailCoordinate = this.detailCoordinate.bind(this)
  }

  initUi() {
    this.setState({ uiVisible: true });
    this.initUISubscriber();
  }

  initUISubscriber() {
    this.currentTile$ = MapData.currentTile$.pipe(throttleTime(250)).subscribe(data => {
      if (data) {
        // const coords = CoordinateHelper.str2Obj(this.state.currentCoordinates);
        // if (coords.X !== data.x || coords.Y !== data.y) {
          this.setState({ currentCoordinates: data.x + '|' + data.y });
        // }
      }
    });    
  }

  componentWillUnmount() {
    console.log('unmounting');
  }

  componentDidMount() {
      // TODO: Add loading functionality.
    document.body.className += ' ' + 'map';

    this.props.loaded.then(() => {
      MapApplication.start().then(() => {
        this.initUi();
        this.startGameplay();
      });
    });

    this.props.unloaded.then(() => {
      this.currentTile$.unsubscribe();
    });
  }

  viewPlayer(player) {
    Router.push('/game/details/players/profile/[profile]', '/game/details/players/profile/' + player.name);
    this.setState({ playersInfoOpen: false });
  }

  detailCoordinate() {
    this.setState({ infoOpen: false });
    Router.push({
      pathname: '/game/map/coordinate',
      query: { 
          x: MapData.currentTile.x, 
          y: MapData.currentTile.y 
      }
    });
  }

  dialogSupplanter(key, supplantKey) {
    const supplanter = () => {
      this.setDialogVisible(supplantKey, false)();
      this.setDialogVisible(key, true)();
    };
    return supplanter.bind(this);
  }

  setDialogVisible(key, open) {
    const dialogCloser = () => {
      const dialogState = {};
      dialogState[key] = open;
      this.setState(dialogState);

      if (open) {
        MapData.mapViewport.plugins.pause('drag');
      } else {
        MapData.mapViewport.plugins.resume('drag');
      }

      // FIXME: Pause mousewheel and scroll effects so users can scroll on overflow: auto content.
    }
    return dialogCloser.bind(this);
  }

  closeAllDialogs() {
    // Renable mousewheel and dragging.
  }

  async startGameplay() {
    if (!MapData.world.player.spawn) {
      const user = UserHelper.getUserFromCookie();
      const spawns = await FirebaseHelper.getData('worlds/game_data/' + user.currentWorld + '/spawns');

      MapData.world.spawns = spawns;

      // TODO: May need to check if correct page first due to timed trigger.
      this.setState({ spawnSelectOpen: true });
    }
  }

  render() {
    const { classes } = this.props;
    return (
          <>
            {/* DIALOGS */}
            {BiomeInfo(this, classes)}
            {PlayersInfo(this, classes)}
            {ItemInfo(this, classes)}
            {StructureInfo(this, classes)}
            <CoordinateOverview parent={this} classes={classes} />
            <HelpDialog parent={this} parentClasses={classes} />
            <ZoomDialog parent={this} parentClasses={classes} />
            <EditCoordinateField parent={this} parentClasses={classes} />
            <UnitGroupsInfo parent={this} classes={classes} />

            {/* TODO: Add restart/respawn option to change spawn. */}
            <SpawnSelect parent={this} parentClasses={classes} />

            { this.state.uiVisible ?
              <>
                <div id="info-container"
                  onClick={this.setDialogVisible('infoOpen', true)}
                  className={`${classes.mapInfoContainer} ${classes.infoBox}`}>
                  {this.state.currentCoordinates}
                  <DetailsIcon className={classes.infoActionButtonIcon} />
                  {/* TODO: Add biome, units, items, structures (owner, size, etc) data */}
                </div>

                <div id="actions-container" 
                  className={`${classes.actionsInfoContainer} ${classes.infoBox}`}>
                  
                  {/* TODO: Change to GPS FIXED ICON? */}
                  <IconButton className={classes.actionButton} onClick={this.detailCoordinate}>
                    <LocationSearchIcon />
                  </IconButton>
                  <IconButton className={classes.actionButton} onClick={this.setDialogVisible('zoomDialogOpen', true)}>
                    <PageViewIcon />
                  </IconButton>
                  <IconButton className={classes.actionButton} onClick={this.setDialogVisible('helpDialogOpen', true)}>
                    <HelpIcon />
                  </IconButton>
                </div> 

                {/* TODO: Add reports/notifications container */}
              </> : null
            }

            <div id="map-container"></div>
          </>
    );
  }

}


MapComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(MapComponent);