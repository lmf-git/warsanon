import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

class StyledComponent extends Component {

  render() {
    const { classes } = this.props;
    return 'test';
  }

}


StyledComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(StyledComponent);