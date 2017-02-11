import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Map } from 'immutable';

import firebaseApi from '../../api/firebase';
import { messageCreated, initMessageView, closeMessageView } from '../../actions/messageActions';
import { joinChat, quitChat } from '../../actions/chatActions';

import TextAreaInput from '../common/TextAreaInput';
import Bubble from '../common/Bubble';
import ScrollToBottom from '../common/ScrollToBottom';
import LoadingDots from '../common/LoadingDots';
import MessageList from './MessageList';

const styles = {
  discussion: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    width : '80vw'
  },
  messageBuilder: {
    display: 'flex',
    width: '65vw',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  members: {
    borderLeft: '1px solid #f1f0f0',
    width: '20vw',
    padding: 10,
    overflowY: 'scroll',
    borderBottom: '1px solid #f1f0f0'
  },
  component: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  sendButton: {
    fontSize: 20,
    marginLeft: 10,
    cursor: 'pointer'
  },
  memberList: {
    paddingLeft: 10,
    color: '#1E90FF'
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #f1f0f0',
    paddingBottom: 20,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize'
  }
};

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.updateMessageState = this.updateMessageState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.joinChat = this.joinChat.bind(this);
    this.quitChat = this.quitChat.bind(this);
    this.state = {
      message: { body: '' },
      saving: false
    };
  }

  componentDidMount() {
    this.props.actions.initMessageView(this.props.params.chatUid);
  }

  componentWillReceiveProps(nextProps) {
    this.props.actions.closeMessageView(this.props.params.chatUid);
    this.props.actions.initMessageView(nextProps.params.chatUid);
  }

  componentWillUnmount() {
    this.props.actions.closeMessageView(this.props.params.chatUid);
  }

  updateMessageState(event) {
    const field = event.target.name;
    let message = this.state.message;
    message[field] = event.target.value;
    return this.setState({ message });
  }

  sendMessage() {
    if(!this.state.message || !this.state.message.body.length) {
      return toastr.error('You need to type a message !');
    }
    this.setState({saving: true});

    this.props.actions.messageCreated(this.state.message, this.props.params.chatUid)
      .then(user => {
        this.setState({saving: false, message: {body: ''}});
        toastr.success('New message sent !');
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  joinChat() {
    this.setState({saving: true});

    this.props.actions.joinChat(this.props.params.chatUid)
      .then(user => {
        this.setState({saving: false});
        toastr.success('You are now a member of this chat !');
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  quitChat() {
    this.setState({saving: true});

    this.props.actions.quitChat(this.props.params.chatUid)
      .then(user => {
        this.setState({saving: false});
        toastr.success('You are no longer a member of this chat');
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    const isMember = this.props.chat.members && !!this.props.chat.members[this.props.user.displayName];

    return (<div style={styles.component}>
      <div style={styles.title}>
        {this.props.chat.name}
      </div>
      <div style={styles.discussion}>
        <MessageList {...this.props.params}/>
        <div style={styles.members}>
          {isMember && <div>
            <button type="button" className="btn btn-danger" onClick={this.quitChat}>
              Quit this chat
            </button>
            <br/>
          </div>}
          <b>Members:</b>
          <div style={styles.memberList}>
          {
            Object.keys(this.props.chat.members || {}).map((name) => {
              return <div key={name}>{name}</div>;
            })
          }
          </div>
        </div>
      </div>
      {isMember ? <div style={styles.messageBuilder}>
        <TextAreaInput
          name="body"
          label=""
          onChange={this.updateMessageState}
          value={this.state.message.body}
          width="50vw"
        />
      {this.state.saving ?
        <LoadingDots dots={6} /> :
        <span
        className="glyphicon glyphicon-send"
        aria-hidden="true"
        onClick={this.sendMessage}
        style={styles.sendButton}
      />}
      </div> :
      <button type="button" className="btn btn-primary btn-lg" onClick={this.joinChat}>
        Click here to join this chat and start sending messages !
      </button>
     }
    </div>);
  }
}


Discussion.propTypes = {
  actions: React.PropTypes.object.isRequired,
  messages: React.PropTypes.object.isRequired,
  style: React.PropTypes.object,
  params: React.PropTypes.object,
  chat: React.PropTypes.object,
  user: React.PropTypes.object,
  currentUserUID: React.PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  return {
    chat: state.chats.get(ownProps.params.chatUid, new Map()),
    currentUserUID: state.auth.currentUserUID,
    user: state.user || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ messageCreated, initMessageView, closeMessageView, joinChat, quitChat }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
