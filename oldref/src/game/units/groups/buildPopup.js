import React, { Component } from 'react';

import Router from 'next/router';

import UserHelper from '../../../../src/user/userHelper';
import UnitGroupsHelper from '../../../../src/game/units/groups/helper';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import myTheme from '../../../../src/style/theme';

import Button from '@material-ui/core/Button';

import BuildSelection from '../../../ui/units/group/buildSelection';
import SnackbarElement from '../../../../src/layout/elements/snackbar';


const styles = theme => ({
});


class BuildPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedStructure: '',
        buildSnackbar: false,
        buildMsg: ''
    };
  }

  async build() {
    const user = UserHelper.getUserFromCookie();
    const { selectedStructure } = this.state;
    
    const config = {
      structure: selectedStructure,
      playerId: user.uid,
      world: user.currentWorld,
      coords: this.props.unitGroup.coords,
      unitGroupId: this.props.groupId
    };

    try {
      const buildResponse = await UnitGroupsHelper.build(config);
      // Sucess snackbar
      const messageContent = (
        <>
          <span>Unit Group Building:</span>
          <Button onClick={() => {
            // Close snackbar & Route to group details.
            this.setState({ buildSnackbar: false }, () => {

              Router.push(
                '/game/command/groups/details/[groupId]',
                '/game/command/groups/details/' + this.props.groupId
              )
            });
          }}>VIEW</Button>
        </>
      );

      this.setState({ buildMsg: messageContent }, () => {
        this.setState({ buildSnackbar: true })
      });

    } catch(e) {
      // Error snackbar
      console.log(e);
      this.setState({ buildMsg: 'Something went wrong.' }, () => {
          this.setState({ buildSnackbar: true })
      })
    }

    this.props.setClose();
  }

  render() {
    const { classes, isOpen, setClose, title } = this.props;

    return (
      <>
        <SnackbarElement 
          isOpen={this.state.buildSnackbar} 
          setClose={() => { this.setState({ buildSnackbar: false }); }} 
          msg={this.state.buildMsg}
        />
        
        <BuildSelection 
          title={title}
          setClose={setClose}
          onSubmit={(selectedStructure) => {
            this.setState({ selectedStructure }, this.build);
          }}
          isOpen={isOpen} />
        </>
    );
  }

}

BuildPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuildPopup);
