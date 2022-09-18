import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import clsx from 'clsx';

import UserHelper from '../../src/user/userHelper';
import WorldDataHelper from '../../src/world/worldDataHelper';
import WorldHelper from '../../src/world/worldHelper';
import PageContentTitle from '../../src/layout/elements/page-content-title';

const styles = theme => ({
  worldsContainer: {
    paddingBottom: '2em',
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
  worldListItemMain: {
    padding: '2em 0',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '3em'
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



class GameWorlds extends Component {

  constructor(props) {
    super(props);

    let joinedWorlds = props.joinedWorlds;
    if (typeof window !== 'undefined') {
      joinedWorlds = UserHelper.getJoinedWorldsFromUser(UserHelper.getUserFromCookie());
    }

    this.state = { 
      joinedWorlds: joinedWorlds
    };

    this.joinWorld = this.joinWorld.bind(this);
    this.isWorldJoined = this.isWorldJoined.bind(this);
  }

  static async getInitialProps({ req, res }) {
    let props = {};
    props = UserHelper.adornInitialProps(req, props);

    UserHelper.completionGuard(props, res);
    props.worlds = await WorldDataHelper.getWorldsConfigsData();
    props.joinedWorlds = UserHelper.getJoinedWorldsFromUser(props.user);
    return props;
  };

  isWorldJoined(worldName) {
    const joinedWorlds = this.state.joinedWorlds;
    return joinedWorlds.hasOwnProperty(worldName);
  }

  joinWorldState(worldName) {
    let joinedWorlds = this.state.joinedWorlds;
    joinedWorlds[worldName] = true;

    this.setState({
      joinedWorlds: joinedWorlds
    });
  }

  joinWorld(worldName) {
    WorldHelper.join(worldName).then(result => {
      this.joinWorldState(worldName);
    });
  }

  render() {
      const { classes } = this.props;

      UserHelper.completionGuard(this.props, null);

      return (
        <Container maxWidth="lg" className={classes.worldsContainer}>
          <PageContentTitle title="Worlds" />
          <div className={classes.worldList}>
            {this.props.worlds.map(world => (
              <div key={world.name } className={classes.worldListItem}>
                {/* <img src={'/static/world_thumbnail.jpg'} alt={world.name} className={classes.worldTileImage} /> */}
                
                <div className={classes.worldListItemMain}>
                  {world.name} 
                </div>

                <div className={classes.tileBar}>
                  {/* <div className={classes.worldTitle}>{world.name}</div> */}
                  <div className={classes.worldActions}>
                    <Button color="secondary" variant="contained" onClick={() => { 
                      WorldHelper.navigateToStatistics(world.name) 
                    }} value={world.name} aria-label={`Info about ${world.name}`} className={clsx(classes.actionButton, classes.infoIcon)} >
                      INFO
                      <InfoIcon className={classes.actionIcon} />
                    </Button>
                    {/* TODO: Implement className={clsx(classes.actionButton, classes.iconSmall)} */}
                    { 
                      !this.isWorldJoined(world.name) ?
                      <Button color="primary" variant="contained" 
                        onClick={() => { this.joinWorld(world.name) }}
                        aria-label={`Play ${world.name}`} className={clsx(classes.actionButton, classes.joinIcon)} >
                        JOIN
                        <VpnKeyIcon className={classes.actionIcon} />
                      </Button> : null 
                    }
                    { this.isWorldJoined(world.name) ?
                      <Button color="primary" variant="contained" onClick={() => { 
                        WorldHelper.playWorld(world.name) 
                      }} aria-label={`Play ${world.name}`} className={clsx(classes.actionButton, classes.joinIcon)} >
                        PLAY
                        <PlayIcon className={classes.actionIcon} />
                      </Button> : null
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      );
  }

}


export default withStyles(styles)(GameWorlds);