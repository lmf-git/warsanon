import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import UserHelper from '../src/user/userHelper';
import { Button } from '@material-ui/core';
import NewsHelper from '../src/news/newsHelper';

import moment from 'moment';

const useStyles = makeStyles(theme => ({
  mainContent: {
    paddingBottom: '2em'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
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
}));


const MoreNewsButon = function() {
  const classes = useStyles();
  return (
    <Link href="/news">
      <Button 
        className={classes.moreNewsButton} 
        color="primary" 
        variant="outlined">
          MORE NEWS
      </Button>
    </Link>
  );
}

// TODO: Show 5 newest members home page
const Index = function(props) {
  const classes = useStyles();

  const featuredNewsItem = props.featuredPost;
  const otherNewsItems = props.latestPosts;

  return (
    <Container maxWidth="lg">
      <main className={classes.mainContent}>
        <Paper className={classes.mainFeaturedPost} 
                   style={{ backgroundImage: 'url(' + featuredNewsItem.imageUrl + ')' }}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {featuredNewsItem.title} 
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {featuredNewsItem.shortText}
                </Typography>
                <Link variant="subtitle1" href={'/news/featured_item'}>>Continue reading…</Link>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={4} className={classes.cardGrid}>
          {otherNewsItems.map(post => (
            <Grid item key={post.title} xs={12} md={6}>
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
        <MoreNewsButon />
      </main>
    </Container>
  );
  
}


Index.getInitialProps = async function({ req }) {

  const props = {
    latestPosts: await NewsHelper.getLatestFivePosts(),
    featuredPost: await NewsHelper.getFeaturedItem()
  };

  return UserHelper.adornInitialProps(req, props);
};


export default Index;