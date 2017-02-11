import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

import checkAuth from '../requireAuth';

import ChatList from './ChatList';

const styles = {
  chats: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center'
  },
  chatList: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
};

class ChatPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div style={styles.chats}>
      <ChatList style={styles.chatList} {...this.props.params}/>
      {this.props.children}
    </div>);
  }
}

ChatPage.propTypes = {
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.node,
};

export default checkAuth(connect()(ChatPage));
