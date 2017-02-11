import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Map } from 'immutable';

import Bubble from '../common/Bubble';
import ScrollToBottom from '../common/ScrollToBottom';

const styles = {
  messages: {
    width: '80vw',
    padding: 10,
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '100%'
  },
};

class MessageList extends Component {
  render() {
    const messages = this.props.messages.valueSeq();

    return (
        <ScrollToBottom style={styles.messages}>
          {
            messages.size ? messages.sort((m1, m2)=>m1.date-m2.date).map((message) => {
              return (<Bubble
                key={message.uid}
                {...message}
                right={this.props.currentUserUID === message.senderUid}
              />);
            }) :
            <div>There is no messages yet</div>
          }
        </ScrollToBottom>
    );
  }
}


MessageList.propTypes = {
  messages: React.PropTypes.object.isRequired,
  currentUserUID: React.PropTypes.string,
  chatUid: React.PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    messages: state.messages.get(ownProps.chatUid, new Map()),
    currentUserUID: state.auth.currentUserUID,
  };
}

export default connect(mapStateToProps)(MessageList);
