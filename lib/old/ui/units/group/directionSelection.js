import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent, Radio, RadioGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';

import myTheme from '../../../style/theme';



const styles = theme => ({
  header: myTheme.common.dialog.header,
  close: myTheme.common.dialog.close,
  title: myTheme.common.dialog.title,
  paper: myTheme.common.dialog.paper,
  content: myTheme.common.dialog.content,
  actions: myTheme.common.dialog.actions,
  directionsWrapper: { 
    width: '100%',
    paddingTop: '1.5em',
    position: 'relative'
  },
  directionsForm: { width: '100%' },
  directionsGroup: {},
  directionsRadio: {
    textAlign: 'center'
  },
  compassImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    paddingTop: '1.5em'
  },
  label: {
    width: '100%',
    // padding: '2em',
    margin: 0
  },
  directionsGrid: {
    margin: 0
  }
});


class DirectionSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
        direction: ''
    };
  }

  componentDidMount() {
  }

  onChange(ev, value) {
    this.setState({ direction: value })
  }

  render() {
    const { 
      classes, 
      isOpen, 
      setClose, 
      title,
      onSubmit
    } = this.props;
    
    return (
      <Dialog 
        open={isOpen} 
        onClose={setClose} 
        classes={{ paper: classes.paper }}
        className={classes.content}>
          <DialogContent>
              <div className={classes.header}>
                <span className={classes.title}>{title}</span>
                <IconButton className={classes.close} onClick={setClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Divider />
              </div>

              <div className={classes.directionsWrapper}>
                <img src="/static/assets/ui/compass.png" className={classes.compassImage} />
                <FormControl component="fieldset" className={classes.directionsForm}>
                  <RadioGroup aria-label="position" name="position" 
                    className={classes.directionsGroup}
                    value={this.state.direction} 
                    onChange={(ev, val)=> this.onChange(ev, val)} row>
                      <Grid container spacing={3} alignItems="center" className={classes.directionsGrid}>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="West"
                            control={<Radio color="primary" />}
                            label="W"
                            labelPlacement="top"
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="North West"
                            control={<Radio color="primary" />}
                            label="NW"
                            labelPlacement="top"
                          />
                        </Grid>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="North"
                            control={<Radio color="primary" />}
                            label="N"
                            labelPlacement="top"
                          />
                        </Grid>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="South West"
                            control={<Radio color="primary" />}
                            label="SW"
                            labelPlacement="top"
                          />
                        </Grid>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <b>HERE</b>
                        </Grid>
                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="North East"
                            control={<Radio color="primary" />}
                            label="NE"
                            labelPlacement="top"
                          />
                        </Grid>

                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="South"
                            control={<Radio color="primary" />}
                            label="S"
                            labelPlacement="top"
                          />
                        </Grid>

                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="South East"
                            control={<Radio color="primary" />}
                            label="SE"
                            labelPlacement="top"
                          />
                        </Grid>

                        <Grid item xs={4} className={classes.directionsRadio}>
                          <FormControlLabel
                            className={classes.label}
                            value="East"
                            control={<Radio color="primary" />}
                            label="E"
                            labelPlacement="top"
                          />
                        </Grid>

                      </Grid>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={classes.actions}>
                <Button onClick={() => onSubmit(this.state.direction)}>GO</Button>
              </div>
          </DialogContent>
      </Dialog>
    );
  }

}


DirectionSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(DirectionSelection);
