import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function extractChatProperties(firebaseChat) {
  const chat = {};
  const chatProperties = [
    'name',
    'uid',
    'members',
  ];

  chatProperties.map((prop) => {
    if (prop in firebaseChat) {
      chat[prop] = firebaseChat[prop];
    }
  });

  return chat;
}

export function newChat(chat) {
  return {
    type: types.NEW_CHAT,
    payload: chat
  };
}

export function updateChat(chat) {
  return {
    type: types.UPDATE_CHAT,
    payload: chat
  };
}

export function joinChat(chatUid) {
  return (dispatch, getState) => {
    const user = getState().user;
    return firebaseApi.databaseSet(`/chats/${chatUid}/members/${user.displayName}`, true);
  };
}

export function quitChat(chatUid) {
  return (dispatch, getState) => {
    const user = getState().user;
    return firebaseApi.databaseSet(`/chats/${chatUid}/members/${user.displayName}`, null);
  };
}

export function initChatList() {
  return (dispatch) => {
    firebaseApi.GetChildAdded('/chats', chat => {
      dispatch(newChat({...chat.val(), uid: chat.key}));
    });

    firebaseApi.GetChildChanged('/chats', chat => {
      dispatch(updateChat({...chat.val(), uid: chat.key}));
    });
  };
}

export function chatCreated(chat) {
  return (dispatch) => {
    return firebaseApi.databasePush('/chats', extractChatProperties(chat))
      .then(
        () => dispatch(chatCreatedSuccess())
      )
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          throw(error);
        });
  };
}

function chatCreatedSuccess(createdChat) {
  return {
    type: types.CHAT_CREATED_SUCCESS,
    payload: createdChat
  };
}
