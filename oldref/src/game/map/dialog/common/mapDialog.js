import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import theme from '../../../../style/theme';


const styles = () => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.25em 0.5em',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  headerClose: {
    marginLeft: 'auto'
  },
  headerTitle: {
    fontSize: '1.35em',
    fontWeight: '500'
  },
  content: {
    padding: '0.25em',
    background: '#ffffffbf'
  },
  paper: {
    background: 'transparent',
    minWidth: '50%'
  },
  actions: {
    textAlign: 'right',
    paddingTop: '0.5em',
  },
});


class MapDialog extends Component {

  render() {
    const { open, onClose, headerTitle, content, actions, classes } = this.props;

    return (
      <Dialog open={open} onClose={onClose} 
        classes={{ paper: classes.paper }}
        className={classes.infoDialog}>
          <DialogContent className={classes.content}>
              <div className={classes.header}>
                  <span className={classes.headerTitle}>
                    {headerTitle}
                  </span>
                  <IconButton 
                    className={classes.headerClose}
                    onClick={onClose} aria-label="Close">
                      <CloseIcon />
                  </IconButton>
                  <Divider />
              </div>

              {content}
              
              { actions ? 
                <div className={classes.actions}>
                  {actions}
                </div> : null
              }
          </DialogContent>
      </Dialog>
    );
  }
}

MapDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapDialog)