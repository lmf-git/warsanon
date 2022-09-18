import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import NewsHelper from '../../src/news/newsHelper';
import { withRouter } from 'next/router'



const styles = theme => ({
  root: {
    flexGrow: 1,
   },
   mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
});


class NewsPost extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req, query }) {
      return { post: await NewsHelper.getPostByKey(query.post) };
    };

    render() {
        const { classes } = this.props;
        const post = this.props.post;
        // console.log(this.props);

        return (
            <Container maxWidth="lg">
                <Paper className={classes.mainFeaturedPost} 
                   style={{ backgroundImage: 'url(' + post.imageUrl + ')' }}>
                    <div className={classes.overlay} />
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    {post.shortText}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                {post.content}
            </Container>
        );
    }

}


NewsPost.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(NewsPost));