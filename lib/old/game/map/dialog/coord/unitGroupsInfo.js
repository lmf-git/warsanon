import React, { Component } from 'react';
import Router from 'next/router';
import _ from 'underscore';


import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import CloseIcon from '@material-ui/icons/Close';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ColorizeIcon from '@material-ui/icons/Colorize';
import GavelIcon from '@material-ui/icons/Gavel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import BuildIcon from '@material-ui/icons/SettingsApplications';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

import TileData from '../../data/tileData';
import UnitGroupsHelper from '../../../units/groups/helper';
import UserHelper from '../../../../user/userHelper';
import RegionEntities from '../../data/regionEntities';

import MovePopup from '../../../units/groups/movePopup';
import GatherPopup from '../../../units/groups/gatherPopup';
import BuildPopup from '../../../units/groups/buildPopup';
import TradePopup from '../../../../ui/trade/tradePopup';



export default class UnitGroupsInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            group: undefined,
            moveOpen: false,
            gatherOpen: false,
            buildOpen: false,
            tradeOpen: false,
            groupId: ''
        }
    }

    render() {
        const { parent, classes } = this.props;
        const coords = parent.state.currentCoordinates;
        const unitGroups = TileData.getField(coords, 'unitGroups') || {};
        const unitGroupKeys = TileData.getFieldKeys(coords, 'unitGroups');
    
        const currentUser = UserHelper.getUserFromCookie();
        
        const ownUnitGroup = _.filter(unitGroups, (group) => { 
            return group.owner.id === currentUser.uid 
        })[0] || null;

        let items = {};
        if (ownUnitGroup) {
            if (typeof ownUnitGroup.items !== 'undefined' && ownUnitGroup.items) {
                items = ownUnitGroup.items;
            }
        }
    
        const groupActions = (groupKey) => {
            const group = unitGroups[groupKey];
            const groupId = groupKey;
            this.setState({ open: true, group, groupId });
        }
    
        const isActionGroupOwn = () => {
            if (this.state.group && ownUnitGroup) {
                if (this.state.group.owner.id === ownUnitGroup.owner.id) {
                    return true;
                }
            }
            return false;
        };
    
        const isOwnGroup = (groupKey) => {
            if (ownUnitGroup) {
                if (unitGroups[groupKey].owner.id === ownUnitGroup.owner.id) {
                    return true;
                }
            }
            return false;
        }
    
    
        return (
            <>
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.open}
                    onClose={() => { this.setState({ open: false }); }}
                    onOpen={() => { this.setState({ open: true }); }}>
                        <List>
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
                                            parent.setDialogVisible('unitGroupsOpen', false)();
                                            this.setState({ moveOpen: true, open: false }); 
                                        }}>
                                        <ListItemIcon>
                                            <OpenWithIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Move'} />
                                    </ListItem>
    
                                    <ListItem button
                                        onClick={() => { 
                                            parent.setDialogVisible('unitGroupsOpen', false)();
                                            this.setState({ gatherOpen: true, open: false }); 
                                        }}>
                                        <ListItemIcon>
                                            <ControlPointIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Gather'} />
                                    </ListItem>

                                    <ListItem button
                                        onClick={() => { 
                                            parent.setDialogVisible('unitGroupsOpen', false)();
                                            this.setState({ tradeOpen: true, open: false }); 
                                        }}>
                                        <ListItemIcon>
                                            <CompareArrowsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Trade'} />
                                    </ListItem>

                                    <ListItem button
                                        onClick={() => { 
                                            parent.setDialogVisible('unitGroupsOpen', false)();
                                            this.setState({ buildOpen: true, open: false }); 
                                        }}>
                                        <ListItemIcon>
                                            <BuildIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Build'} />
                                    </ListItem>
                                </>
                                : null
                            }
    
                            <ListItem button
                                onClick={() => {
                                    parent.setDialogVisible('unitGroupsOpen', false)();
                                    Router.push(
                                        '/game/command/groups/details/[groupId]',
                                        '/game/command/groups/details/' + this.state.groupId,
                                    )
                                }}>
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary={'View'} />
                            </ListItem>
                        </List>
    
                        <Divider />
                </SwipeableDrawer>
    
                <MovePopup
                    title={'Move: Select Direction'}
                    setClose={() => { 
                        this.setState({ moveOpen: false }) 
                    }}
                    isOpen={this.state.moveOpen}
                    unitGroup={this.state.group}
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

                <TradePopup
                    title={'Trade: Create Offer'}
                    setClose={() => { 
                        this.setState({ tradeOpen: false }) 
                    }}
                    isOpen={this.state.tradeOpen}
                    itemsPool={items}
                    sourceId={this.state.groupId}
                    sourceType='unitGroup'
                />
    
                <Dialog 
                    open={parent.state.unitGroupsOpen} 
                    onClose={parent.setDialogVisible('unitGroupsOpen', false)} 
                    classes={{ paper: classes.infoDialogPaper }}
                    className={classes.infoDialog}>
                    <DialogContent className={classes.infoDialogContent}>
                        <div className={classes.infoDialogHeader}>
                            <span className={classes.infoDialogHeaderTitle}>
                                {coords} | UNIT GROUPS
                            </span>
                            <IconButton 
                            className={classes.infoDialogHeaderClose}
                            onClick={parent.setDialogVisible('unitGroupsOpen', false)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Divider />
                        </div>
    
                        {unitGroupKeys.length > 0 ? 
                            <Table className={classes.infoTable}>
                                <colgroup>
                                    <col width="70%" />
                                    <col width="20%" />
                                    <col width="10%" />
                                </colgroup>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Leader</TableCell>
                                        <TableCell align="left">Size</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {unitGroupKeys.map(groupKey => {
                                        if (!RegionEntities.isMobilising(unitGroups[groupKey])) {
                                            return (
                                                <TableRow 
                                                    key={groupKey}
                                                    className={classes.infoRow}
                                                    onClick={() => { groupActions(groupKey); }}>
    
                                                    <TableCell 
                                                        style={!isOwnGroup(groupKey) ? 
                                                            { color: 'black' }
                                                            :
                                                            { color: 'green', fontWeight: 'bold' }
                                                        }
                                                        align="left">
                                                        {unitGroups[groupKey].owner.username}
                                                    </TableCell>


                                                    {/* FIXME: Add activity */}
    
                                                    <TableCell align="left">
                                                        {UnitGroupsHelper.sizeLabel(unitGroups[groupKey])}
                                                    </TableCell>
    
                                                    <TableCell align="right">
                                                        <IconButton><GavelIcon /></IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                            : // Else
                            <Typography className={classes.infoEmpty}>
                                No units present here.
                            </Typography>
                        }
    
                        <div className={classes.infoActions}>
                            <Button variant="contained" onClick={parent.dialogSupplanter('infoOpen', 'unitGroupsOpen')}>
                                BACK <ArrowBackIcon className={classes.infoActionButtonIcon} />
                            </Button>
                            <Button variant="contained" onClick={() => { parent.setDialogVisible('unitGroupsOpen', false)(); parent.detailCoordinate(); }}>
                                DETAILS <LocationSearchIcon className={classes.infoActionButtonIcon} />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}
