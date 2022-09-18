import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import UserHelper from '../../../src/user/userHelper';
import PageContentTitle from '../../../src/layout/elements/page-content-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#5a5a5a'
  },
  overviewActionWrapper: {
    textDecoration: 'none'
  },
  cardContainer: {
    display: 'flex',
    background: 'none',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    background: '#556cd6',
    boxSizing: 'border-box',
    marginBottom: '10px',
    width: 'calc(1/2*100% - (1 - 1/2)*10px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  title: {}
});



class OverviewPage extends Component {

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
    
    const cardTitle = (title) => {
      return (
        <CardContent>
          <Typography className={classes.title}>
            {title}
          </Typography>
        </CardContent>
      );
    };

    const linkButton = (link, text) => {
      return (
        <Link href={ link }>
          <a className={classes.overviewActionWrapper}>
            <Button variant="outlined" size="large">
              { text }
            </Button>
          </a>
        </Link>
      );
    };

    return (
        <Container maxWidth="lg">
            <PageContentTitle title="Overview" />
            <Paper className={classes.cardContainer}>
              <Card className={classes.card}>
                { cardTitle('WORLD') }
                <CardActions>
                  { linkButton('/game/map', 'MAP') }
                  {/* { linkButton('/game/map', 'PROPERTIES(?)') } */}
                  {/* { linkButton('/game/map', 'RANKINGS') } */}
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('COMMAND') }
                <CardActions>
                  {linkButton('/game/command/groups', 'GROUPS')}
                  {linkButton('/game/command/pending', 'PENDING')}
                  {/* { linkButton('/game/map', 'TRADE') }
                  { linkButton('/game/map', 'TRANSPORT') } */}
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('MANAGE') }
                <CardActions>
                  { linkButton('/game/manage/units', 'UNITS') }
                  { linkButton('/game/manage/items', 'ITEMS') }
                </CardActions>
              </Card>

              {/* 

              <Card className={classes.card}>
                { cardTitle('UNITS') }
                <CardActions>
                  { linkButton('/game/map', 'TRAIN') }
                  { linkButton('/game/map', 'VIEW') }
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('LEADERSHIP') }
                <CardActions>
                  { linkButton('/game/map', 'GROUP') }
                  { linkButton('/game/map', 'ALLIANCE') }
                  { linkButton('/game/map', 'ENEMIES') }
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('SOCIAL') }
                <CardActions>
                  { linkButton('/game/map', 'PROFILE') }
                  { linkButton('/game/map', '[CHAT &] MAIL') }
                  { linkButton('/game/map', 'FORUM') }
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('REPORTS') }
                <CardActions>
                  { linkButton('/game/map', 'EVENTS') }
                  { linkButton('/game/map', 'HISTORY') }
                </CardActions>
              </Card>

              <Card className={classes.card}>
                { cardTitle('GAME') }
                <CardActions>
                  { linkButton('/game/map', 'SETTINGS') }
                  { linkButton('/game/map', 'PROFILE') }
                  { linkButton('/game/map', 'VALOR $$$$') }
                </CardActions>
              </Card> */}
            </Paper>
        </Container>
    );
  }

}


OverviewPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(OverviewPage);
