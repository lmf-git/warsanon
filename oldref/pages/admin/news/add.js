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


class AddNews extends Component {

    getInitialProps({ req }) {
        const props = {};
        return UserHelper.adornInitialProps(req, props);
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            imageUrl: '',
            shortText: '',
            formDisabled: false
        };

        this.createNews = this.createNews.bind(this);
    }

    componentDidMount() {
        UserHelper.routeGuard();
    }

    async createNews() {
        this.setState({ formDisabled: true });
        const { title, shortText, content, imageUrl } = this.state;
        const newsItem = { 
            title: title, 
            shortText: shortText,
            created: Date.now(),
            imageUrl: imageUrl,
            content: content
        };

        const newsKey = newsItem.title.replace(/ /g, '_').toLowerCase();

        try {     
            FirebaseHelper.getRef().database().ref('news/' + newsKey).set(newsItem, (err) => {
                console.log(err);
                // Router.push('/admin/news/manage');
            });

        } catch(e) {
            console.log('Join world error', e);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg">
            <PageContentTitle title="Admin: Add News" />
            <Paper className="elevation2" style={ { paddingBottom: '10em' } }>
                <Box my={4}>
                    <FormGroup className={classes.form}>
                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">Title</FormLabel>
                            <TextField fullWidth
                                margin="normal"
                                value={this.state.title}
                                onChange={e => { this.setState({ title: e.target.value }); }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                            />
                        </FormControl>

                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">Short Text</FormLabel>
                            <TextField fullWidth
                                margin="normal"
                                value={this.state.shortText}
                                onChange={e => { this.setState({ shortText: e.target.value }); }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                            />
                        </FormControl>

                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">Content</FormLabel>
                            <TextField fullWidth
                                margin="normal"
                                value={this.state.content}
                                onChange={e => { this.setState({ content: e.target.value }); }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                                multiline
                                rows="4"
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl component="fieldset" className={classes.control}>
                            <FormLabel component="legend">Image URL</FormLabel>
                            <TextField fullWidth
                                margin="normal"
                                value={this.state.imageUrl}
                                onChange={e => { this.setState({ imageUrl: e.target.value }); }}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ className: classes.textField }}
                            />
                        </FormControl>

                        <Button type="submit" variant="outlined" color="primary"
                            onClick={this.createNews}
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


AddNews.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AddNews);