import * as ActionTypes from './ActionTypes';

export const message = (state = { errMess: null, message: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return { ...state, errMess: null, message: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };
      case ActionTypes.ADD_MESSAGE:
      var newcmt = action.payload;
      newcmt.id = state.message.length;
      return { ...state, message: state.message.concat(newcmt) };
    default:
      return state;
  }
};