import CoordinateHelper from '../../helper/coordinateHelper';

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
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TileData from '../../data/tileData';


export default function ItemInfo(parent, classes) {
    const coords = parent.state.currentCoordinates;
    const items = TileData.getField(coords, 'items');
    const itemKeys = TileData.getFieldKeys(coords, 'items');

    return (
        <Dialog open={parent.state.itemsInfoOpen} onClose={parent.setDialogVisible('itemsInfoOpen', false)} 
        classes={{ paper: classes.infoDialogPaper }}
        className={classes.infoDialog}>
            <DialogContent className={classes.infoDialogContent}>
                <div className={classes.infoDialogHeader}>
                    <span className={classes.infoDialogHeaderTitle}>
                        {coords} | ITEMS
                    </span>
                    <IconButton 
                        className={classes.infoDialogHeaderClose}
                        onClick={parent.setDialogVisible('itemsInfoOpen', false)} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                </div>

                {itemKeys.length > 0 ? 
                    <Table className={classes.infoTable}>
                        <colgroup>
                            <col width="80%" />
                            <col width="20%" />
                            {/* <col width="10%" /> */}
                        </colgroup>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Item</TableCell>
                                {/* <TableCell align="left">Qty</TableCell> */}
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itemKeys.map(itemKey => (
                                <TableRow key={itemKey}>
                                    <TableCell align="left">
                                        {items[itemKey].itemId} x {items[itemKey].quantity}
                                    </TableCell>
                                    {/* <TableCell align="left">{items[itemKey].quantity}</TableCell> */}
                                    <TableCell align="right">
                                        <IconButton><VisibilityIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : // Else
                    <Typography style={{ padding: '1em', textAlign: 'center', fontWeight: 'bold', color: '#d50002' }}>
                        No items exist here.
                    </Typography>
                }

                <div className={classes.infoActions}>
                    <Button variant="contained" onClick={parent.dialogSupplanter('infoOpen', 'itemsInfoOpen')}>
                        BACK <ArrowBackIcon className={classes.infoActionButtonIcon} />
                    </Button>
                    <Button variant="contained" onClick={() => { parent.setDialogVisible('itemsInfoOpen', false)(); parent.detailCoordinate(); }}>
                        DETAILS <LocationSearchIcon className={classes.infoActionButtonIcon} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
