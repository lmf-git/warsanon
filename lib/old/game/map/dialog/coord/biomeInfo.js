import CoordinateHelper from '../../helper/coordinateHelper';

import Table from '@material-ui/core/Table';
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
import TileData from '../../data/tileData';


export default function BiomeInfo(parent, classes) {
    const coords = parent.state.currentCoordinates;
    const coordsObject = CoordinateHelper.str2Obj(coords);
    const biome = TileData.getField(coords, 'BIOME');

    return (
        <Dialog open={parent.state.biomeOpen} onClose={parent.setDialogVisible('biomeOpen', false)} 
        classes={{ paper: classes.infoDialogPaper }}
        className={classes.infoDialog}>
            <DialogContent className={classes.infoDialogContent}>
                <div className={classes.infoDialogHeader}>
                    <span className={classes.infoDialogHeaderTitle}>
                        {coords} | BIOME | {biome}
                    </span>
                    <IconButton 
                    className={classes.infoDialogHeaderClose}
                    onClick={parent.setDialogVisible('biomeOpen', false)} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                </div>

                <div className={classes.infoActions}>
                    <Button variant="contained" onClick={parent.dialogSupplanter('infoOpen', 'biomeOpen')}>
                        BACK <ArrowBackIcon className={classes.infoActionButtonIcon} />
                    </Button>
                    <Button variant="contained" onClick={() => { parent.setDialogVisible('biomeOpen', false)(); parent.detailCoordinate(); }}>
                        DETAILS <LocationSearchIcon className={classes.infoActionButtonIcon} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
