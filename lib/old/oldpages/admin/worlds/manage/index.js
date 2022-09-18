import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import WorldDataHelper from '../../../../src/world/worldDataHelper';
import Pagetitle from '../../../../src/layout/elements/page-content-title';
import UserPageHOC from '../../../../src/user/userPageHoc';
import UserHelper from '../../../../src/user/userHelper';
// import UserPageHoc from '../../../../src/user/userPageHoc';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
});

class ManageWorlds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      worlds: this.props.worlds
    };
  }

  static async getInitialProps({ req }) {
    let props = {
      worlds :await WorldDataHelper.getWorldsConfigsData(),
    }
    return UserHelper.adornInitialProps(req, props);
  };

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg">
        <Pagetitle title="Manage Worlds" />

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="left"># Players</TableCell>
                <TableCell align="right">
                  {/* ACTIONS */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.worlds.map(world => (
                <TableRow key={world.name}>
                  <TableCell component="th" scope="row">
                    {world.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {world.created}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    #?
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <Button color="primary" href={`/admin/worlds/manage/${world.name}`}>
                      MANAGE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    );
  }

}

export default withStyles(styles)(ManageWorlds);