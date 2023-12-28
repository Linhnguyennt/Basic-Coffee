import * as ActionTypes from './ActionTypes';

export const users = (state = { userinfo: null, logged: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return { ...state, userinfo: action.payload, logged: true };
    case ActionTypes.LOGOUT_USER:
      return { ...state, logged: false };
    default:
      return state;
  }
};