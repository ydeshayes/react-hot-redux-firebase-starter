import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import firebaseApi from '../../api/firebase';
import { Link } from 'react-router';

import { chatCreated, initChatList } from '../../actions/chatActions';

import ChatModal from './ChatModal';

const styles = {
  list: {
    overflowY: 'scroll',
    height: '100%'
  },
  active: {
    backgroundColor: '#1E90FF',
    color: 'white',
    textDecoration: 'none'
  }
};

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.updateChatState = this.updateChatState.bind(this);
    this.createChat = this.createChat.bind(this);
    this.state = {
      chat: {},
      saving: false
    };
  }

  componentDidMount() {
    this.props.actions.initChatList();
  }

  updateChatState(event) {
    const field = event.target.name;
    let chat = this.state.chat;
    chat[field] = event.target.value;
    return this.setState({ chat });
  }

  createChat() {
    this.setState({saving: true});

    this.props.actions.chatCreated(this.state.chat)
      .then(user => {
        this.setState({saving: false});
        toastr.success('New chat created !');
        $('#creationChatModal').modal('hide');
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (<div style={this.props.style}>
      <ChatModal
        id="creationChatModal"
        onChange={this.updateChatState}
        onSave={this.createChat}
        saving={this.state.saving}
      />
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#creationChatModal"
      >
        Create new chat
      </button>
      <ul className="list-group" style={styles.list}>
        {
          this.props.chats.valueSeq().map((chat) => {
            return (<li
              className="list-group-item"
              key={chat.uid}
              style={(this.props.chatUid===chat.uid) ? styles.active : {}}
              >
                <Link to={`/chats/${chat.uid}`} activeStyle={styles.active}>
                  {chat.name}
                </Link>
                <br />
                {`${chat.members ? Object.keys(chat.members).length : '0'} members`}
              </li>);
          })
        }
      </ul>
    </div>);
  }
}


ChatList.propTypes = {
  actions: React.PropTypes.object.isRequired,
  chats: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
  chatUid: React.PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    chats: state.chats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ chatCreated, initChatList }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
