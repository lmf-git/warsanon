import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';
import WorldDataHelper from '../../../../src/world/worldDataHelper';

import { withRouter } from 'next/router';
import DataHelper from '../../../../utils/dataHelper';



const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    tableActions: {
        textAlign: 'right',
        padding: '0.25em'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: '1.1em'
    },
    tableCell: {
        color: '#8b8b8b'
    }
});


class WorldSpawnsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            worlds: []
        };
    }

    componentDidMount() {

    }

    static async getInitialProps({ req, query }) {
        const worldKey = query.spawns;
        const props = {
            world: await WorldDataHelper.getWorldConfigsData(worldKey),
            spawns: await WorldDataHelper.getWorldGameData(worldKey, 'spawns.json'),
        }
        
        return UserHelper.adornInitialProps(req, props);
    };

    render() {
        const { classes, world, spawns } = this.props;
        const spawnsCollection = DataHelper.jsonToArrayWithKey(spawns);

        return (
            <Container maxWidth="lg">
                <PageContentTitle title={world.name + ' Spawns'} />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell} align="left">Name</TableCell>
                                <TableCell className={classes.tableHeaderCell} align="left">COORDS</TableCell>
                                <TableCell className={classes.tableHeaderCell} align="left">Direction</TableCell>
                                <TableCell align="right">
                                {/* ACTIONS */}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {spawnsCollection.map(spawn => (
                            <TableRow key={spawn.name}>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {spawn.name}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {spawn.coords.x + '|' + spawn.coords.y}
                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {spawn.positionLabel}
                                </TableCell>
                                <TableCell component="th" scope="row" align="right" className={classes.tableCell}>
                                    <Button color="primary" href={`/admin/worlds/spawn/edit/${world.name + '_' + spawn._key}`}>
                                        EDIT
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    
                    <div className={classes.tableActions}>
                        <Button 
                            href={`/admin/worlds/spawn/add/${world.name}`}
                            color="primary">
                            ADD SPAWN
                        </Button>
                    </div>
                </Paper>
            </Container>
        );
    }

}

export default withStyles(styles)(withRouter(WorldSpawnsList));