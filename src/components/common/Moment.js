import React, {Component} from 'react';
import moment from 'moment';

class Moment extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (<span>
      {moment.unix(this.props.date).fromNow()}
    </span>);
  }
}

Moment.propTypes = {
  date: React.PropTypes.number
};

export default Moment;
