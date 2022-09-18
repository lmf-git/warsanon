import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/ZoomOutMapOutlined';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

import MapApplication from '../../mapApplication';

const styles = () => ({
  fieldsetContainer: {
    padding: '1em'
  }
});

class EditCoordinateField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      X: '',
      Y: ''
    };

    this.preOpenUpdate = this.preOpenUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.processEdit = this.processEdit.bind(this);
  }

  componentDidMount() {
  }

  processEdit() {
    this.props.parent.setDialogVisible('editCoordinateOpen', false)();
    MapApplication.reloadedMove(this.state.X, this.state.Y);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  preOpenUpdate() {
    const coords = this.props.parent.state.currentCoordinates;
    const parts = coords.split('|');
    this.setState({
      X: parseInt(parts[0]),
      Y: parseInt(parts[1])
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.parent.state.editCoordinateOpen} 
        onEnter={this.preOpenUpdate}
        classes={{ paper: this.props.parentClasses.infoDialogPaper }}
        className={this.props.parentClasses.infoDialog}>
          <DialogContent className={this.props.parentClasses.infoDialogContent}>
              <div className={this.props.parentClasses.infoDialogHeader}>
                  <span className={this.props.parentClasses.infoDialogHeaderTitle}>
                    ADJUST VIEW
                  </span>
                  <IconButton 
                      className={this.props.parentClasses.infoDialogHeaderClose}
                      onClick={this.props.parent.setDialogVisible('editCoordinateOpen', false)} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                  <Divider />
              </div>

              <div className={classes.fieldsetContainer}>
                <TextField
                  label="X" name="X" type="number"
                  value={this.state.X} onChange={this.handleChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') { this.processEdit() }
                  }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  margin="normal" variant="outlined" fullWidth
                />
                <TextField
                  label="Y" name="Y" type="number"
                  value={this.state.Y} onChange={this.handleChange}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') { this.processEdit() }
                  }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  margin="normal" variant="outlined" fullWidth
                />
              </div>

              <div className={this.props.parentClasses.infoActions}>
                  <Button variant="contained" onClick={this.processEdit}>
                    GO <EditIcon className={this.props.parentClasses.infoActionButtonIcon} />
                  </Button>
              </div>
          </DialogContent>
      </Dialog>
    );
  }
  
}


EditCoordinateField.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(EditCoordinateField);