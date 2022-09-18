import React, { Component } from 'react';

import Router from 'next/router';

import UnitGroupsHelper from '../../game/units/groups/helper';
import UserHelper from '../../user/userHelper';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import theme from '../../style/theme';


import Button from '@material-ui/core/Button';
import SnackbarElement from '../../layout/elements/snackbar';
import DirectionSelection from '../units/group/directionSelection';


const styles = theme => ({
});


class TradePopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tradeSnackbar: false,
        tradeMsg: ''
    };
  }

  async move() {
    const user = UserHelper.getUserFromCookie();
    const { selectedDirection } = this.state;
    
    const config = {
      playerId: user.uid,
      world: user.currentWorld,
      coords: this.props.coords,
      sourceId: sourceId,
      sourceType: 'unitGroup'
    };

    try {
      const movementResponse = await UnitGroupsHelper.trade(config);
      // Sucess snackbar
      const messageContent = (
        <>
          <span>Unit Group Trading:</span>
          <Button onClick={() => {
            // Close snackbar & Route to group details.
            this.setState({ tradeSnackbar: false }, () => {

              Router.push(
                '/game/command/groups/details/[groupId]',
                '/game/command/groups/details/' + sourceId
              )
            });
          }}>VIEW</Button>
        </>
      );

      this.setState({ tradeMsg: messageContent }, () => {
        this.setState({ tradeSnackbar: true })
      });

    } catch(e) {
      // Error snackbar
      console.log(e);
      this.setState({ tradeMsg: 'Something went wrong.' }, () => {
          this.setState({ tradeSnackbar: true })
      })
    }

    this.props.setClose();
  }

  render() {
    const { classes, isOpen, setClose, title } = this.props;

    return (
      <>
        <SnackbarElement 
          isOpen={this.state.tradeSnackbar} 
          setClose={() => { this.setState({ tradeSnackbar: false }); }} 
          msg={this.state.tradeMsg}
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

TradePopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradePopup);
