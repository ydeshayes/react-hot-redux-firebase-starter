import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.chats, action) {
  switch (action.type) {
    case types.NEW_CHAT:
    case types.UPDATE_CHAT:
      return state.set(action.payload.uid, action.payload);
    default:
      return state;
  }
}
