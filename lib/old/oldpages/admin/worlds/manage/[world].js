import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

// HOC & Component Related
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import UserPageHOC from '../../../../src/user/userPageHoc';


import UserHelper from '../../../../src/user/userHelper';
import WorldDataHelper from '../../../../src/world/worldDataHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';

// import Title from '../../../../src/layout/elements/page-content-title'


const styles = theme => ({
});


class ManageSpecificWorld extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req, query }) {
        const worldKey = query.world;
        const props = {
            world: await WorldDataHelper.getWorldConfigsData(worldKey)
        }
        return UserHelper.adornInitialProps(req, props);
    };

    render() {
        const { classes } = this.props;
        const world = this.props.world;

        return (
            <Container maxWidth="lg">
                <PageContentTitle title={'Manage: ' + world.name} />
                <Paper>
                    <Button color="primary" href={'/admin/worlds/spawn/' + world.name}>SPAWNS</Button>
                </Paper>
            </Container>
        );
    }

}

ManageSpecificWorld.propTypes = {
  classes: PropTypes.object.isRequired,
};


// export default UserPageHOC(withStyles(styles)(withRouter(ManageSpecificWorld)));
export default withStyles(styles)(withRouter(ManageSpecificWorld));