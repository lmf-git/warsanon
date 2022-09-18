import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import UserHelper from '../../../src/user/userHelper';
import PageContentTitle from '../../../src/layout/elements/page-content-title';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Router from 'next/router';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#5a5a5a'
  },
});


class CoordinatePage extends Component {

  constructor(props) {
    super(props);
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

    return (
      <Container maxWidth="lg">
        {/* TODO: If page contains a structure include structure name - TILE PROMINENCE */}
        <PageContentTitle title={ this.props.query.x + '|' + this.props.query.y } />
        <ExpansionPanel>
          {/* <ExpansionPanel disabled> */}
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Structures</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Unit Groups</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Items</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    );
  }

}


CoordinatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(CoordinatePage);