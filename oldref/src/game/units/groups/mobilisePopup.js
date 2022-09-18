import React, { Component } from 'react';

import UserHelper from '../../../../src/user/userHelper';
import PageContentTitle from '../../../../src/layout/elements/page-content-title';
import PlayerData from '../../../../src/game/player/playerData';
import UnitSelection from '../../../../src/ui/units/unitSelection';
import DirectionSelection from '../../../../src/ui/units/group/directionSelection';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';

import UnitGroupsHelper from '../../../../src/game/units/groups/helper';
import myTheme from '../../../../src/style/theme';
import SnackbarElement from '../../../../src/layout/elements/snackbar';
import Router from 'next/router';


const styles = theme => ({

});



class MobilisePopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dirSelectOpen: false,
        selectedUnits: {},
        selectedDirection: '',
        mobiliseSnackbar: false,
        mobiliseMsg: ''
    };
  }

  mobilise() {
    const user = UserHelper.getUserFromCookie();
    const { selectedUnits, selectedDirection } = this.state;
    
    console.log(user);

    const config = {
      units: selectedUnits,
      direction: selectedDirection,
      playerId: user.uid,
      world: user.currentWorld,
      coords: this.props.location,
      username: user.username
    };

    UnitGroupsHelper.mobilise(config).then((response) => {
        const messageContent = (
          <>
            <span>Unit Group Mobillising:</span>
            <Button onClick={() => {
              // Close snackbar & Route to group details.
              this.setState({ mobiliseSnackbar: false }, () => {
                Router.push(
                  '/game/command/groups/details/[groupId]',
                  '/game/command/groups/details/' + response.data,
                )
              });
            }}>VIEW</Button>
          </>
        );
        this.setState({ mobiliseMsg: messageContent }, () => {
          this.setState({ mobiliseSnackbar: true })
        })
      })
      // Error snackbar
      .catch(() => {
        this.setState({ mobiliseMsg: 'Something went wrong.' }, () => {
            this.setState({ mobiliseSnackbar: true })
        })
      })
  }

  render() {
    const { classes, entryOpen, onClose } = this.props;
    const units = this.props.units || {};
    const unitsKeys = Object.keys(units);

    return (
      <>
        <SnackbarElement 
          isOpen={this.state.mobiliseSnackbar} 
          setClose={() => { this.setState({ mobiliseSnackbar: false }); }} 
          msg={this.state.mobiliseMsg}
        />
        
        {/* TODO: Need to add Stance (Aggression mode)  */}
        {/* REVIEWS: Set ownership here / who is controlling / allowed control?  */}
        <UnitSelection 
          sourceUnits={units}
          title={'MOBILISE: Select Units'}
          setClose={onClose}
          onSubmit={data => {
            onClose();
            this.setState({ 
              dirSelectOpen: true,
              selectedUnits: data
            });
          }}
          isOpen={entryOpen} />

        <DirectionSelection 
          title={'MOBILISE: Select Direction'}
          setClose={() => { this.setState({ dirSelectOpen: false }) }}
          onSubmit={(direction) => { 
            this.setState(
              { 
                selectedDirection: direction,
                dirSelectOpen: false
              },
              this.mobilise
            ); 
          }}
          isOpen={this.state.dirSelectOpen} />
      </>
    );
  }

}


MobilisePopup.propTypes = {
  classes: PropTypes.object.isRequired,
};
  

export default withStyles(styles)(MobilisePopup);
