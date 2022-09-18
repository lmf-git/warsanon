import React, { Component } from 'react';

import UserHelper from '../../../../src/user/userHelper';
import GatherSelection from '../../../../src/ui/units/group/gatherSelection';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';

import UnitGroupsHelper from '../../../../src/game/units/groups/helper';
import myTheme from '../../../../src/style/theme';
import SnackbarElement from '../../../../src/layout/elements/snackbar';
import Router from 'next/router';


const styles = theme => ({
});


class GatherPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedAction: '',
        gatherSnackbar: false,
        gatherMsg: ''
    };
  }

  async gather() {
    const user = UserHelper.getUserFromCookie();
    const { selectedAction } = this.state;
    
    const config = {
      action: selectedAction,
      playerId: user.uid,
      world: user.currentWorld,
      coords: this.props.unitGroup.coords,
      unitGroupId: this.props.groupId
    };

    try {
      const gatherResponse = await UnitGroupsHelper.gather(config);
      // Sucess snackbar
      const messageContent = (
        <>
          <span>Unit Group Gathering:</span>
          <Button onClick={() => {
            // Close snackbar & Route to group details.
            this.setState({ gatherSnackbar: false }, () => {

              Router.push(
                '/game/command/groups/details/[groupId]',
                '/game/command/groups/details/' + this.props.groupId
              )
            });
          }}>VIEW</Button>
        </>
      );

      this.setState({ gatherMsg: messageContent }, () => {
        this.setState({ gatherSnackbar: true })
      });

    } catch(e) {
      // Error snackbar
      console.log(e);
      this.setState({ gatherMsg: 'Something went wrong.' }, () => {
          this.setState({ gatherSnackbar: true })
      })
    }

    this.props.setClose();
  }

  render() {
    const { classes, isOpen, setClose, title } = this.props;

    return (
      <>
        <SnackbarElement 
          isOpen={this.state.gatherSnackbar} 
          setClose={() => { this.setState({ gatherSnackbar: false }); }} 
          msg={this.state.gatherMsg}
        />
        
        <GatherSelection 
          title={title}
          setClose={setClose}
          onSubmit={(selectedAction) => {
            this.setState({ selectedAction }, this.gather);
          }}
          isOpen={isOpen} />
        </>
    );
  }

}

GatherPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GatherPopup);
