import React, { Component } from 'react';

import MapData from '../mapData';
import DataHelper from '../../../../utils/dataHelper';
import UserHelper from '../../../user/userHelper';
import MapApplication from '../mapApplication';
import PlayerHelper from '../../player/playerHelper';
import PlayerData from '../../player/playerData';


import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogContent, Radio, RadioGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import GamesIcon from '@material-ui/icons/Games';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MapLocationHandler from '../tileMarkings/MapLocationHandler';
import SnackbarElement from '../../../layout/elements/snackbar';
import MapStructureElement from '../tileMarkings/sprite/MapStructureElement';
import PixiHelper from '../../../../utils/pixi/pixiHelper';
import TileData from '../data/tileData';
import Router from 'next/router';


const styles = () => ({
    warningText: {
        color: 'red'
    }
});


class SpawnSelect extends Component {
    
    static async getInitialProps({ req }) {
        let props = {};
        props = UserHelper.adornInitialProps(req, props);
        return props;
    };

    constructor(props) {
        super(props);
        this.state = { 
            selectValue: '',
            confirmOpen: false,
            successOpen: false,
            feedbackMsg: null
        };
    }

    rowClickHandlerFactory(spawn) {
        return (() => {
            this.setState({ selectValue: spawn._key });

            // TODO: If coordinate within already loaded/same region pan instead, more efficient.
            // MapApplication.move(spawn.coords.x, spawn.coords.y);
            MapApplication.reloadedMove(spawn.coords.x, spawn.coords.y);
        }).bind(this);
    }

    successStateFactory(isOpen) {
        return (() => {
            this.setState({ successOpen: isOpen })
        }).bind(this);
    }

    attemptSpawn() {
        return (() => { 
            this.setState({ confirmOpen: true }) 
        }).bind(this);
    }

    handleSpawn() {
        return (async () => { 

            try {
                const worldKey = MapData.world.config.name;
                const spawn = MapData.world.spawns[this.state.selectValue];

                const spawnResponse = await PlayerHelper.spawn(worldKey, spawn);
                this.setState({ confirmOpen:  false }, () => {
                    this.props.parent.setState({ spawnSelectOpen: false });
                    const text = `Spawned at ${spawn.name} (${spawn.positionLabel}).`;
                    this.setState({ feedbackMsg: text });
                    this.successStateFactory(true)();

                    // DEV: Assume map page due to utilisation of MapData
                    // If map page, update MapData.world.player 
                    MapData.world.player.spawn = spawn;
                    MapData.currentTile$.next(MapData.currentTile);                   
                });
        
            } catch (e) {
                this.setState({ feedbackMsg: `Spawned failed.` });
                this.successStateFactory(true)();
            }

        }).bind(this);
    }

    closeConfirm() {
        return (() => { this.setState({ confirmOpen:  false }); }).bind(this);
    }

    
    render() {
        const { classes } = this.props;
        const spawns = DataHelper.jsonToArrayWithKey(MapData.world.spawns);

        const setClose = this.successStateFactory(false).bind(this);

        return (
            <>
                <SnackbarElement 
                    isOpen={this.state.successOpen} 
                    setClose={setClose} 
                    msg={this.state.feedbackMsg}
                />

                <Dialog open={this.state.confirmOpen} onClose={this.closeConfirm()}>
                    <DialogTitle className={classes.warningText}>
                        Are you sure you want to spawn here?
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText className={classes.warningText}>
                        This cannot be changed without losing all of your progress.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirm()} color="secondary">CANCEL</Button>
                        <Button onClick={this.handleSpawn()} color="primary" autoFocus>CONFIRM</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.props.parent.state.spawnSelectOpen} 
                classes={{ paper: this.props.parentClasses.infoDialogPaper }}
                className={this.props.parentClasses.infoDialog}>
                    <DialogContent className={this.props.parentClasses.infoDialogContent}>
                        <div className={this.props.parentClasses.infoDialogHeader}>
                            <span className={this.props.parentClasses.infoDialogHeaderTitle}>
                                SELECT SPAWN
                            </span>
                            <Divider />
                        </div>

                        <>
                            {spawns.length > 0 ? 
                                <FormControl component="fieldset" style={{ width: '100%' }}>
                                    <RadioGroup aria-label="position" name="position" 
                                        value={this.state.selectValue}>
                                        <Table className={classes.infoTable}>
                                            <colgroup>
                                                <col width="45%" />
                                                <col width="45%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Name</TableCell>
                                                    <TableCell align="left">Location</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {spawns.map(spawn => (
                                                    <TableRow key={spawn._key} onClick={this.rowClickHandlerFactory(spawn)}>
                                                        <TableCell align="left">
                                                        {spawn.name}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {spawn.coords.x + '|' + spawn.coords.y} ({spawn.positionLabel})
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <FormControlLabel
                                                                value={spawn._key}
                                                                control={<Radio color="primary" />}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </RadioGroup>
                                </FormControl>
                                : // Else
                                <Typography style={{ padding: '1em', textAlign: 'center', fontWeight: 'bold', color: '#d50002' }}>
                                    No spawns available.
                                </Typography>
                            }
                        </>

                        <div className={this.props.parentClasses.infoActions}>
                            <Button variant="contained" onClick={this.attemptSpawn()}>
                                SPAWN <GamesIcon className={this.props.parentClasses.infoActionButtonIcon} />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

SpawnSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpawnSelect);