import moment from 'moment';

import firebaseApi from '../api/firebase';
import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';

function extractMessageProperties(firebaseMessage) {
  const message = {};
  const messageProperties = [
    'body',
    'senderUid',
    'senderName',
    'date'
  ];

  messageProperties.map((prop) => {
    if (prop in firebaseMessage) {
      message[prop] = firebaseMessage[prop];
    }
  });

  return message;
}

export function newMessage(message, chatUid) {
  return {
    type: types.NEW_MESSAGE,
    payload: message,
    meta: chatUid
  };
}

export function initMessageView(chatUid) {
  return (dispatch, getState) => {
    const user = getState().user;
    firebaseApi.GetChildAddedWithLimitToLast(`/messages/${chatUid}`, 10, messages => {
      dispatch(newMessage({...messages.val(), uid: messages.key}, chatUid));
    });
  };
}

export function closeMessageView(chatUid) {
  return () => {
    firebaseApi.Off(`/messages/${chatUid}`);
  };
}

export function messageCreated(message, chatUid) {
  return (dispatch, getState) => {
    const user = getState().user;
    const auth = getState().auth;

    const messagePayload = {...message, date: moment.utc().unix(), senderUid: auth.currentUserUID, senderName: user.displayName};
    return firebaseApi.databasePush(`/messages/${chatUid}`, extractMessageProperties(messagePayload))
      .then(
        () => dispatch(messageCreatedSuccess())
      )
      .catch(
        error => {
          dispatch(ajaxCallError(error));
          throw(error);
        });
  };
}

function messageCreatedSuccess(createdMessage) {
  return {
    type: types.MESSAGE_CREATED_SUCCESS,
    payload: createdMessage
  };
}
