import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Link from 'next/link';

import UserHelper from '../../src/user/userHelper';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    padding: '1em',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardTitle: {
    color: '#1b1b1b'
  },
  pageTitle: {
    fontSize: '1.85rem',
    marginTop: '1.5em',
  },
  link: {
    textDecoration: 'none'
  }
}));

const Index = function(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" className={classes.pageTitle} component="h2">Admin Dashboard</Typography>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                    Users
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Manage the fine citizens of our game.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
              <Link href="/admin/users/manage"><a className={classes.link}><Button size="small" color="primary">Manage</Button></a></Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                    Worlds
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Manage and create our wonderful worlds.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href="/admin/worlds/create"><a className={classes.link}><Button size="small" color="primary">Create</Button></a></Link>
                <Link href="/admin/worlds/manage"><a className={classes.link}><Button size="small" color="primary">Manage</Button></a></Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                    Admins
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Sadly, we require politicians.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href="/admin/admins/set"><a className={classes.link}><Button size="small" color="primary">Set</Button></a></Link>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                    News
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Sadly, we require politicians.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link href="/admin/news/add"><a className={classes.link}><Button size="small" color="primary">Add</Button></a></Link>
                <Link href="/admin/news/manage"><a className={classes.link}><Button size="small" color="primary">Manage</Button></a></Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
  
}


Index.getInitialProps = async function({ req }) {
  const props = {};
  return UserHelper.adornInitialProps(req, props);
};


export default Index;