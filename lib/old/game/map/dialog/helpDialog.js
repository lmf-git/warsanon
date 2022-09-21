import React, { Component } from 'react';

// import MapData from '../mapData';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent, Radio, RadioGroup } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';


const styles = () => ({
    warningText: {
        color: 'red'
    }
});

const marks = [
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
];

function valuetext(value) {
    return `${value}%`;
}

function getCurrentZoom() {

}

function adjustForViewportZoomInt(zoomPercent) {

}


class HelpDialog extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
   
    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.parent.state.helpDialogOpen} 
                onClose={this.props.parent.setDialogVisible('helpDialogOpen', false)}
                classes={{ paper: this.props.parentClasses.infoDialogPaper }}
                className={this.props.parentClasses.infoDialog}>
                <DialogContent className={this.props.parentClasses.infoDialogContent}>
                    <div className={this.props.parentClasses.infoDialogHeader}>
                        <span className={this.props.parentClasses.infoDialogHeaderTitle}>
                            NEED HELP?
                        </span>

                        <IconButton 
                            className={this.props.parentClasses.infoDialogHeaderClose}
                            onClick={this.props.parent.setDialogVisible('helpDialogOpen', false)} aria-label="Close">
                            <CloseIcon />
                        </IconButton>

                        <Divider />
                    </div>

                    <h2>Yeah, we all do.</h2>
                </DialogContent>
            </Dialog>
        );
    }
}

HelpDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HelpDialog);