import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import helper from '../../src/user/userHelper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import PageContentTitle from '../../src/layout/elements/page-content-title';

const styles = theme => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
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

class CompleteAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameErrorText: '',
            formDisabled: false
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);

        this.register = this.register.bind(this);
        this.allowReattempt = this.allowReattempt.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
        this.allowReattempt();
    }

    async register() {
        this.setState({ formDisabled: true });
        const newUser = { 
            username: this.state.username
        };

        let existingUser = await helper.getByUsername(newUser.username);

        // Test against a username signature to prevent people stealing mildly dissimilar (character case usernames)
        if (existingUser) {
            this.setState({ usernameErrorText: 'Username is not available.' });

        } else {

            let result = await helper.createUser(newUser).then(what => {
                helper.setUserCookie(newUser);
                Router.push('/account/welcome');
            });

        }
 
    }

    allowReattempt() {
        this.setState({ formDisabled: false, usernameErrorText: '' });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg">
                <PageContentTitle title="Complete Your Account" />
                
                <Typography variant="h4" component="h4" gutterBottom style={ { fontSize: '1.25rem', color: '#c3c3c3' } }>
                    Let's get you started, we require the below data for game functionality.
                </Typography>

                <Paper className="elevation2">
                    <Box my={4}>
                        <FormGroup onSubmit={this.register} className={classes.form}>
                            <FormControl component="fieldset" className={classes.control}>
                                <FormLabel component="legend">Username</FormLabel>
                                <TextField fullWidth
                                    placeholder="Alphanumeric, _ & -"
                                    helperText=""
                                    color="secondary"
                                    margin="normal"
                                    value={this.state.username}
                                    onChange={this.onUsernameChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        className: classes.textField
                                    }}
                                    error= {this.state.usernameErrorText !== ''}
                                    helperText={this.state.usernameErrorText}
                                />
                            </FormControl>

                            <Button type="submit" variant="outlined" color="primary"
                                onClick={this.register}
                                disabled={this.state.formDisabled}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Box>
                </Paper>
            </Container>
        );
    }

}

CompleteAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CompleteAccount);