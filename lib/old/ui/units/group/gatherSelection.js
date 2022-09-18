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
  activitiesWrapper: { 
    width: '100%',
    paddingTop: '1.5em',
    position: 'relative'
  },
  activitiesForm: { 
    width: '100%' 
  },
  activitiesGroup: {

  },
  activityRadio: {
    textAlign: 'center'
  },
  label: {
    width: '50%',
    margin: 0
  },
  activityGrid: {
    margin: 0
  }
});


class GatherSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
        action: ''
    };
  }

  componentDidMount() {
  }

  onChange(ev, value) {
    this.setState({ action: value })
  }

  render() {
    const { 
      classes, 
      isOpen, 
      setClose, 
      title,
      onSubmit
    } = this.props;

    const choices = [
      { key: 'mining', label: 'Mining' },
      { key: 'woodcutting', label: 'Woodcutting' },
      { key: 'harvesting', label: 'Harvesting' },
      { key: 'hunting', label: 'Hunting' },
    ]
    
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

              <div className={classes.activitiesWrapper}>
                <FormControl component="fieldset" className={classes.activitiesForm}>
                  <RadioGroup aria-label="position" name="position" 
                    className={classes.activitiesGroup}
                    value={this.state.direction} 
                    onChange={(ev, val)=> this.onChange(ev, val)} row>

                      <Grid container spacing={3} alignItems="center" 
                        className={classes.activityGrid}>

                        {choices.map(choice => (
                          <Grid key={choice.key} item xs={12} className={classes.activityRadio}>
                            <FormControlLabel
                              className={classes.label}
                              value={choice.key}
                              control={<Radio color="primary" />}
                              label={choice.label}
                              labelPlacement="right"
                            />
                          </Grid>
                        ))}

                      </Grid>
                  </RadioGroup>
                </FormControl>
              </div>

              <div className={classes.actions}>
                <Button onClick={() => onSubmit(this.state.action)}>GO</Button>
              </div>
          </DialogContent>
      </Dialog>
    );
  }

}


GatherSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(GatherSelection);
