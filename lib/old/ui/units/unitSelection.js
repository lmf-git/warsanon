import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent, Radio, RadioGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';

import myTheme from '../../style/theme';



const styles = theme => ({
  header: myTheme.common.dialog.header,
  close: myTheme.common.dialog.close,
  title: myTheme.common.dialog.title,
  paper: myTheme.common.dialog.paper,
  content: myTheme.common.dialog.content,
  actions: myTheme.common.dialog.actions,

  selectWrapper: {
    padding: '1em'
  },

  selectRow: {
    padding: '1em'
  }
});


function valuetext(value) {
  return value;
}


class UnitSelection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      units: {}
    };
  }

  componentDidMount() {
    // Initialise state items for units.
    // console.log(this.props);
  }

  onChange(key, inputVal) {
    const value = parseInt(inputVal);
    if (this.state.units[key] !== value) {
      this.setState({ 
        units: {
          [key]: value
        }
      });
    }
  }

  render() {
    const { 
      classes, 
      sourceUnits, 
      isOpen, 
      setClose, 
      title,
      onSubmit
    } = this.props;
    
    const units = sourceUnits || {}; 
    const unitsKeys = Object.keys(units);

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

              { unitsKeys.length > 0 ?
                <div className={classes.selectWrapper}>
                  {unitsKeys.map(unitKey => (
                    <React.Fragment key={unitKey}>
                      <div className={classes.selectRow}>
                        <span>{unitKey} ({units[unitKey].quantity} Available)</span>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs>
                            <Slider
                              value={typeof this.state.units[unitKey] === 'number' ? 
                                this.state.units[unitKey] : 0
                              }
                              orientation="horizontal"
                              defaultValue={0}
                              valueLabelDisplay="auto"
                              aria-labelledby="horizontal-slider"
                              step={1}
                              min={0}
                              getAriaValueText={valuetext}
                              onChange={(ev, val) => { this.onChange(unitKey, val) }}
                              max={units[unitKey].quantity}
                            />
                          </Grid>
                          <Grid item>
                            <Input
                              className={classes.input}
                              value={typeof this.state.units[unitKey] === 'number' ? 
                                this.state.units[unitKey] : 0
                              }
                              margin="dense"
                              onChange={(ev, val) => { this.onChange(unitKey, ev.target.value) }}
                              inputProps={{
                                style: { textAlign: 'center' },
                                step: 1,
                                min: 0,
                                max: units[unitKey].quantity,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <Divider />
                    </React.Fragment>
                  ))}
                </div>
                : null
              }

              <div className={classes.actions}>
                <Button onClick={() => onSubmit(this.state.units)}>SELECT</Button>
              </div>
          </DialogContent>
      </Dialog>
    );
  }

}


UnitSelection.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(UnitSelection);
