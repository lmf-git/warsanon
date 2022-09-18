import React, { Component } from 'react';

import MapData from '../mapData';
import MapDialog from './common/mapDialog';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Slider from '@material-ui/core/Slider';


const styles = () => ({
    warningText: {
        color: 'red'
    },
    sliderWrapper: {
        height: '500px',
        padding: '4em 2.5em',
        textAlign: 'center'
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
    let zoom = 50;
    if (typeof MapData.mapViewport !== 'undefined') {
        zoom = MapData.mapViewport.scale.x * 50;
    }
    return zoom
}


class ZoomDialog extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            zoomLevel: 50,
        };
        this.zoom = this.zoom.bind(this);
    }
   
    zoom(event, value) {
        const zoomLevel = value / 50;
        if (zoomLevel !== this.state.zoomLevel) {
            this.setState({ zoomLevel });
            MapData.mapViewport.setZoom(zoomLevel + 0.1, true);
        }
    }

    render() {
        const { classes } = this.props;

        const open = this.props.parent.state.zoomDialogOpen;
        const onClose = this.props.parent.setDialogVisible('zoomDialogOpen', false);

        return (
            <MapDialog
                open={open}
                onClose={onClose}
                headerTitle='SET ZOOM'
                content={
                    <div className={classes.sliderWrapper}>
                        <Slider
                            orientation="vertical"
                            defaultValue={getCurrentZoom()}
                            getAriaValueText={valuetext}
                            aria-labelledby="vertical-slider"
                            valueLabelDisplay="auto"
                            onChange={this.zoom}
                            step={2}
                            marks={marks}
                            min={0}
                            max={100}
                        />
                    </div>
                }
            />
        );
    }
}


ZoomDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ZoomDialog);