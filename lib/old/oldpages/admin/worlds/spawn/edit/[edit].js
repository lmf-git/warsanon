import React, { Component } from 'react';
import _ from 'underscore';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

import PageContentTitle from '../../../../../src/layout/elements/page-content-title';
import WorldDataHelper from '../../../../../src/world/worldDataHelper';
import UserHelper from '../../../../../src/user/userHelper';
import Spawn from '../../../../../src/world/structure/spawn';

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 30px',
  },
  form: {
      padding: '2em'
  },
  control: {
      color: 'black',
      paddingBottom: '2em'
  },
  textField: {
      color: 'black'
  }
});



class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.spawn.name,
      positionLabel: this.props.spawn.positionLabel,
      x: this.props.spawn.coords.x,
      y: this.props.spawn.coords.y,
    };

    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }

  static async getInitialProps({ req, query }) {
    const worldSpawnKey = query.edit;
    const keyParts = worldSpawnKey.split(/_(.+)/);

    let props = {
      world :await WorldDataHelper.getWorldConfigsData(keyParts[0]),
      spawn: await WorldDataHelper.getWorldGameData(keyParts[0], 'spawns/' + keyParts[1] + '.json'),
      spawnId: keyParts[1],
      worldId: keyParts[0]
    }
    return UserHelper.adornInitialProps(req, props);
  };

  componentDidMount() {
    console.log(this.props);
  }

  handleChange(event) {
    const inputName = event.target.name;
    this.setState({ [inputName]: event.target.value });
  }

  async update() {
    try {
      const spawnData = {
       name: this.state.name,
       positionLabel: this.state.positionLabel,
       coords: {
         x: parseInt(this.state.x),
         y: parseInt(this.state.y),
       }
      }

      // Extend original data.
      const updatedSpawn = _.extend(this.props.spawn, spawnData);

      const result = await Spawn.update(this.props.worldId, updatedSpawn, this.props.spawnId);
      return result;

    } catch(e) {
      alert('ERROR');
      console.log(e);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg">
        <PageContentTitle title="Edit Spawn" />
        <Paper className={classes.root}>
          <Box my={4}>
          <FormGroup onSubmit={this.register} className={classes.form}>
                  <FormControl component="fieldset" className={classes.control}>
                    <FormLabel component="legend">Name</FormLabel>
                    <TextField fullWidth
                        name="name"
                        color="secondary"
                        margin="normal"
                        onChange={this.handleChange}
                        value={this.state.name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            className: classes.textField
                        }}
                    />
                  </FormControl>

                  <FormControl component="fieldset" className={classes.control}>
                    <FormLabel component="legend">Position Label</FormLabel>
                    <TextField fullWidth
                      name="positionLabel"
                      color="secondary"
                      margin="normal"
                      onChange={this.handleChange}
                      value={this.state.positionLabel}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      InputProps={{
                          className: classes.textField
                      }}
                    />
                  </FormControl>

                  <FormControl component="fieldset" className={classes.control}>
                    <FormLabel component="legend">X Coordinate</FormLabel>
                    <TextField fullWidth
                      color="secondary"
                      name="x"
                      margin="normal"
                      onChange={this.handleChange}
                      value={this.state.x}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      type="number"
                      InputProps={{
                          className: classes.textField
                      }}
                    />
                  </FormControl>

                  <FormControl component="fieldset" className={classes.control}>
                    <FormLabel component="legend">Y Coordinate</FormLabel>
                    <TextField fullWidth
                      name="y"
                      color="secondary"
                      margin="normal"
                      onChange={this.handleChange}
                      value={this.state.y}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      type="number"
                      InputProps={{
                          className: classes.textField
                      }}
                    />
                  </FormControl>

                  <Button type="submit" variant="outlined" color="primary"
                      onClick={this.update}>
                      Submit
                  </Button>
              </FormGroup>
          </Box>
        </Paper>
      </Container>
    );
  }

}

export default withStyles(styles)(Edit);