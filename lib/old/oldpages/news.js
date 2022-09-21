import React, { Component } from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import NewsHelper from '../src/news/newsHelper';
import PageContentTitle from '../src/layout/elements/page-content-title';
import UserHelper from '../src/user/userHelper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  postTitle: {
    color: '#131313'
  },
  postDesc: {
    color: '#404040'
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  moreNewsButton: {
    margin: 'auto',
    display: 'block',
    padding: '0.6em',
    marginTop: '1.25em'
  }
});


class News extends Component {

  static async getInitialProps({ req }) {
    let props = {
      news: await NewsHelper.getLatestFivePosts()
    };    
  
    return UserHelper.adornInitialProps(req, props);
  };

  render() {
    const { classes } = this.props;
    const latestPosts = this.props.news;

    return (
      <Container maxWidth="lg">
        <PageContentTitle title="News" />
        <Grid container spacing={4} className={classes.cardGrid}>
          {latestPosts.map(post => (
            <Grid item key={post._key} xs={12} md={6}>
              <CardActionArea component="a" href={`/news/${post._key}`}>
                <Card className={classes.card}>
                  <div className={classes.cardDetails}>
                    <CardContent>
                      <Typography component="h2" variant="h5" className={classes.postTitle}>
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {moment(post.created).format('MMMM Do YYYY')}
                      </Typography>
                      <Typography variant="subtitle1" paragraph className={classes.postDesc}>
                        {post.shortText}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>
                    </CardContent>
                  </div>
                  <Hidden xsDown>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.imageUrl}
                      title="Image title"
                    />
                  </Hidden>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

}

News.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(News);