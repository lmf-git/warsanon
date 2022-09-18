import { Component } from 'react';
import moment from 'moment';

export default class Countdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      worldConfig: props.worldConfig,
      event: props.event
    };
    this.state.remainingTime = this.calcTime();
  }

  calcTime() {
    const currentTick = this.state.worldConfig.tick;
    const completionTick = this.state.event.completionTick;
    const updated = this.state.worldConfig.updated;
    const duration = (completionTick - currentTick) * ((60 * 1000) * 5);
    const completionTime = updated + duration;
    const diff = completionTime - Date.now();
    let remainingText = '';

    if (Date.now() < completionTime) {
      // Convert to minutes for readability.
      remainingText = moment.utc(diff).format("m[m] s[s]");
    } else {
      // If completed, destroy component - stop counting.
    }

    return remainingText;
  }

  componentDidMount() {
    this.counter = setInterval(() => { this.setState({ remainingTime: this.calcTime() }); }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  render() {
    return (this.state.remainingTime);
  }

}
