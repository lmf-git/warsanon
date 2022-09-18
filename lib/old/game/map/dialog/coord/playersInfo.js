import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import LocationSearchIcon from '@material-ui/icons/LocationSearching';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';

import TileData from '../../data/tileData';
import RegionEntities from '../../data/regionEntities';



// FIXME: Refactor classes out of parent, into theme at least if not individual.
export default function PlayersInfo(parent, classes) {
    const coords = parent.state.currentCoordinates;
    const players = TileData.getField(coords, 'players');
    const playerKeys = TileData.getFieldKeys(coords, 'players');

    // const visiblePlayers = playerKeys.filter(key => {
    //     if (!RegionEntities.isMobilising(players[key])) {
    //         return true;
    //     }
    //     return false;
    // });

    // console.log(visiblePlayers);

    return (
        <Dialog open={parent.state.playersInfoOpen} onClose={parent.setDialogVisible('playersInfoOpen', false)} 
        classes={{ paper: classes.infoDialogPaper }}
        className={classes.infoDialog}>
            <DialogContent className={classes.infoDialogContent}>
                <div className={classes.infoDialogHeader}>
                    <span className={classes.infoDialogHeaderTitle}>
                        {coords} | PLAYERS
                    </span>
                    <IconButton 
                    className={classes.infoDialogHeaderClose}
                    onClick={parent.setDialogVisible('playersInfoOpen', false)} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                </div>

                <div className={classes.tableContentWrapper}>
                <>
                    {playerKeys.length > 0 ? 
                    <Table className={classes.infoTable}>
                        <colgroup>
                            <col width="80%" />
                            <col width="20%" />
                            {/* <col width="10%" /> */}
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Rank</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playerKeys.map(playerKey => {
                                if (!RegionEntities.isMobilising(players[playerKey])) {
                                    return (
                                        <TableRow key={playerKey}
                                            className={classes.infoRow}
                                            onClick={() => { parent.viewPlayer(players[playerKey]) } }>
                                            <TableCell align="left">
                                                {players[playerKey].name}
                                            </TableCell>
                                            <TableCell align="left">
                                                Rank
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton><VisibilityIcon /></IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                    : // Else
                    <Typography className={classes.infoEmpty}>
                        No players here.
                    </Typography>
                    }
                </>
                </div>

                <Divider />
                
                <div className={classes.infoActions}>
                    <Button variant="contained" onClick={parent.dialogSupplanter('infoOpen', 'playersInfoOpen')}>
                        BACK <ArrowBackIcon className={classes.infoActionButtonIcon} />
                    </Button>
                    <Button variant="contained" onClick={() => { parent.setDialogVisible('playersInfoOpen', false)(); parent.detailCoordinate(); }}>
                        DETAILS <LocationSearchIcon className={classes.infoActionButtonIcon} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
