import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.messages, action) {
  switch (action.type) {
    case types.NEW_MESSAGE:
        return state.setIn([action.meta, action.payload.uid], action.payload);
    default:
      return state;
  }
}
