import React, { Component } from 'react';

import UserHelper from '../../../src/user/userHelper';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import PageContentTitle from '../../../src/layout/elements/page-content-title';
import Link from 'next/link';
import FirebaseHelper from '../../../src/auth/firebaseHelper';


const styles = theme => ({
    form: {
        padding: '2em'
    },
    control: {
        color: 'black',
        paddingBottom: '2em'
    },
    textField: {
        color: 'black'
    }
});


class CreateWorld extends Component {

    getInitialProps({ req }) {
        const props = {};
        return UserHelper.adornInitialProps(req, props);
    };

    constructor(props) {
        super(props);
        this.state = {
            worldSeed: parseInt(Math.random().toString().slice(2,11)),
            worldName: '',
            formDisabled: false,
            usernameErrorText: ''
        };

        this.createWorld = this.createWorld.bind(this);
    }

    componentDidMount() {
        UserHelper.routeGuard();
    }

    async createWorld() {
        this.setState({ formDisabled: true });
        const { worldName, worldSeed } = this.state;
        const newWorld = { 
            name: worldName, 
            seed: worldSeed,
            created: Date.now(),
            tick: 1,
            updated: Date.now()
        };

        // REVIEWS: Consider adding world join requirements, exclusibity, prestige, invite only, 

        try {     
            FirebaseHelper.getRef().database().ref('worlds/configs/' + worldName).set(newWorld, (err) => {
                console.log(err);
                Router.push('/admin/worlds/manage');
            });

        } catch(e) {
            console.log('Join world error', e);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg">
            <PageContentTitle title="Admin: Create World" />
            <Paper className="elevation2" style={ { paddingBottom: '10em' } }>
                <Box my={4}>
                    <FormGroup className={classes.form}>
                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">World Name</FormLabel>
                            <TextField fullWidth
                                margin="normal"
                                value={this.state.worldName}
                                onChange={e => { this.setState({ worldName: e.target.value }); }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                            />
                        </FormControl>
   
                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">World Seed</FormLabel>
                            <TextField
                                value={this.state.worldSeed}
                                onChange={e => { this.setState({ worldSeed: e.target.value }); }}
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                                margin="normal"
                            />
                        </FormControl>

                        <Button type="submit" variant="outlined" color="primary"
                            onClick={this.createWorld}
                            disabled={this.state.formDisabled}>
                            Create
                        </Button>
                    </FormGroup>
                </Box>
            </Paper>
        </Container>
        );
    }

}


CreateWorld.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(CreateWorld);