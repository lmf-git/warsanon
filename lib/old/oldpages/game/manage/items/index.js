import React, { Component } from 'react';
import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

import myTheme from '../../../../src/style/theme';


const styles = theme => (myTheme.common.gameEntityTable);



class ManageItemsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ req, query }) {
    let props = { query };
    props = UserHelper.adornInitialProps(req, props);
    return props;
  };

  componentDidMount() {
 
  }

  render() {
    const { classes } = this.props;
    const units = {}
    const unitsKeys = Object.keys(units);

    return (
        <Container maxWidth="lg">
            <PageContentTitle title="Items" />
            <Paper>
              <div className={classes.tableContentWrapper}>
                <>
                    {unitsKeys.length > 0 ? 
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
                            {unitsKeys.map(playerKey => (
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
                            ))}
                        </TableBody>
                    </Table>
                    : // Else
                    <Typography style={{ padding: '1em', textAlign: 'center', fontWeight: 'bold', color: '#d50002' }}>
                        No items.
                    </Typography>
                    }
                </>
                </div>
            </Paper>
        </Container>
    );
  }

}


ManageItemsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(ManageItemsPage);
