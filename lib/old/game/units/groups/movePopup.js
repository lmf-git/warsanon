import React, { Component } from 'react';

import UserHelper from '../../../../src/user/userHelper';
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


class MovePopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedDirection: '',
        moveSnackbar: false,
        moveMsg: ''
    };
  }

  async move() {
    const user = UserHelper.getUserFromCookie();
    const { selectedDirection } = this.state;
    
    const config = {
      direction: selectedDirection,
      playerId: user.uid,
      world: user.currentWorld,
      coords: this.props.unitGroup.coords,
      unitGroupId: this.props.groupId
    };

    try {
      const movementResponse = await UnitGroupsHelper.move(config);
      // Sucess snackbar
      const messageContent = (
        <>
          <span>Unit Group Moving:</span>
          <Button onClick={() => {
            // Close snackbar & Route to group details.
            this.setState({ moveSnackbar: false }, () => {

              Router.push(
                '/game/command/groups/details/[groupId]',
                '/game/command/groups/details/' + this.props.groupId
              )
            });
          }}>VIEW</Button>
        </>
      );

      this.setState({ moveMsg: messageContent }, () => {
        this.setState({ moveSnackbar: true })
      });

    } catch(e) {
      // Error snackbar
      console.log(e);
      this.setState({ moveMsg: 'Something went wrong.' }, () => {
          this.setState({ moveSnackbar: true })
      })
    }

    this.props.setClose();
  }

  render() {
    const { classes, isOpen, setClose, title } = this.props;

    return (
      <>
        <SnackbarElement 
          isOpen={this.state.moveSnackbar} 
          setClose={() => { this.setState({ moveSnackbar: false }); }} 
          msg={this.state.moveMsg}
        />
        
        <DirectionSelection 
          title={title}
          setClose={setClose}
          onSubmit={(selectedDirection) => {
            this.setState({ selectedDirection }, this.move);
          }}
          isOpen={isOpen} />
        </>
    );
  }

}

MovePopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovePopup);
