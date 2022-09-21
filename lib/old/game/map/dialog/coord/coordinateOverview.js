import _ from 'underscore';
import React, { Component } from 'react';

import CoordinateHelper from '../../helper/coordinateHelper';
import TileData from '../../data/tileData';
import MapData from '../../mapData';
import DataHelper from '../../../../../utils/dataHelper';
import UserHelper from '../../../../user/userHelper';
import PlayerData from '../../../player/playerData';

import MapDialog from '../common/mapDialog';
import MobilisePopup from '../../../units/groups/mobilisePopup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import EditIcon from '@material-ui/icons/ZoomOutMapOutlined';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';



export default class CoordinateOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      mobiliseOpen: false,
      units: {}
    }
  }

  render() {
    const { parent, classes } = this.props;
    const coords = parent.state.currentCoordinates;
    const structureData = TileData.getField(coords, 'structure');
  
    const biome = TileData.getField(coords, 'BIOME');
    const playersNum = TileData.getFieldItemsVisibleNum(coords, 'players');
    const unitGroupsNum = TileData.getFieldItemsVisibleNum(coords, 'unitGroups');

    const itemsNum = TileData.getFieldItemsNum(coords, 'items');
  
    const structureLabel = CoordinateHelper._structureLabel(structureData);
  
    // Has units here and is structure, offer related options:
    let structureActions = false;
    if (structureData) {
      const player = MapData.world.player;

      // Check if structure owned by player or is player spawn.
      if (player) {
        const structureArr = DataHelper.jsonObjectToArray(structureData);
        let structure = null;
        if (structureArr.length > 0) structure = structureArr[0];
        if (structure.type === 'spawn' && player.spawn) {
          if (structure._key === player.spawn.structureId) structureActions = true;
        }
      }
    }

    const initMobiliseUI = async () => { 
      const user = UserHelper.isoGetUser();
      const dataPath = PlayerData.getEntityPath(user, 'units', coords);
      const units = await DataHelper.isoFetch(null, dataPath);

      parent.setDialogVisible('infoOpen', false)();

      this.setState(() => { 
        return { 
          units: units, 
          mobiliseOpen: true, 
          open: false 
        }
      });
    };
  
    return (
      <>
        <MobilisePopup 
          entryOpen={this.state.mobiliseOpen}
          onClose={() => { this.setState(() => { return { mobiliseOpen: false } }); }}
          units={this.state.units}
          location={coords}
        />
  
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.open}
          onClose={() => { this.setState(() => { return { open: false }; }) }}
          onOpen={() => { this.setState(() => { return { open: true } }); }}>
            
          <List>
            <ListItem button 
              onClick={initMobiliseUI}>
              <ListItemIcon>
                  <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary={'Mobilise'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                  <CompareArrowsIcon />
              </ListItemIcon>
              <ListItemText primary={'Trade'} />
            </ListItem>
          </List>
  
          <Divider />
        </SwipeableDrawer>
  
        <MapDialog 
          open={parent.state.infoOpen}
          onClose={parent.setDialogVisible('infoOpen', false)}
          headerTitle={
            <Button variant="contained" 
              onClick={parent.dialogSupplanter('editCoordinateOpen', 'infoOpen')}>
              {coords}
              <EditIcon style={{ marginLeft: '0.5em' }} /> 
            </Button>
          }
          content={
            <Table className={classes.infoTable}>
              <TableBody>
                <TableRow className={classes.infoRow} 
                  onClick={parent.dialogSupplanter('biomeOpen', 'infoOpen')}>
                  <TableCell align="left">BIOME</TableCell>
                  <TableCell align="center">{biome}</TableCell>
                  <TableCell align="right">
                      <IconButton><InfoIcon /></IconButton>
                  </TableCell>
                </TableRow>
                { playersNum > 0 ?
                  <TableRow className={classes.infoRow} 
                    onClick={parent.dialogSupplanter('playersInfoOpen', 'infoOpen')}>
                    <TableCell align="left">PLAYERS</TableCell>
                    <TableCell align="center">{playersNum}</TableCell>
                    <TableCell align="right">
                        <IconButton><InfoIcon /></IconButton>
                    </TableCell>
                  </TableRow> : null
                }
                { unitGroupsNum > 0 ?
                  <TableRow className={classes.infoRow} 
                    onClick={parent.dialogSupplanter('unitGroupsOpen', 'infoOpen')}>
                    <TableCell align="left">UNIT GROUPS</TableCell>
                    <TableCell align="center">{unitGroupsNum}</TableCell>
                    <TableCell align="right">
                      <IconButton><InfoIcon /></IconButton>
                    </TableCell>
                  </TableRow> : null
                }
                { itemsNum > 0 ?
                  <TableRow className={classes.infoRow} 
                    onClick={parent.dialogSupplanter('itemsInfoOpen', 'infoOpen')}>
                    <TableCell align="left">ITEMS</TableCell>
                    <TableCell align="center">{itemsNum}</TableCell>
                    <TableCell align="right">
                      <IconButton><InfoIcon /></IconButton>
                    </TableCell>
                  </TableRow> : null
                }
                { structureLabel !== '-' ?
                  <TableRow className={classes.infoRow} 
                    onClick={parent.dialogSupplanter('structureInfoOpen', 'infoOpen')}>
                    <TableCell align="left">STRUCTURE</TableCell>
                    <TableCell align="center">{structureLabel}</TableCell>
                    <TableCell align="right">
                      <IconButton><InfoIcon /></IconButton>
                    </TableCell>
                  </TableRow> : null
                }
              </TableBody>
            </Table>
          }
          actions={
            <>
              { structureActions ?
                <Button variant="contained" 
                  onClick={() => { this.setState({ open: true, mobiliseOpen: false }); }}>
                  ACTIONS <KeyboardArrowUpIcon className={classes.infoActionButtonIcon} />
                </Button> : null
              }
              <Button variant="contained" onClick={parent.detailCoordinate}>
                DETAILS <LocationSearchIcon className={classes.infoActionButtonIcon} />
              </Button>
            </>
          }
        />
      </>
    );
  }
  
}
