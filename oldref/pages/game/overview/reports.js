import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import UserHelper from '../../../src/user/userHelper';
import PageContentTitle from '../../../src/layout/elements/page-content-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Router from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#5a5a5a'
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



class ReportsPage extends Component {

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

    return (
        <Container maxWidth="lg">
            <PageContentTitle title="Overview" />
            <Paper className={classes.cardContainer}>
              <Card className={classes.card}>
                { cardTitle('MAP') }
                <CardActions>
                  <Button size="small">GO</Button>
                </CardActions>
              </Card>
            </Paper>
        </Container>
    );
  }

}


ReportsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(ReportsPage);
