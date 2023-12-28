import * as ActionTypes from './ActionTypes';

export const checkout = (state = { isLoading: false, order: null, errMess: null }, action) => {
    switch (action.type) {
      case ActionTypes.CHECKOUT_LOADING:
        return { ...state, isLoading: true, order: null, errMess: null };
      case ActionTypes.CHECKOUT_SUCCESS:
        return { ...state, isLoading: false, order: action.payload, errMess: null };
      case ActionTypes.CHECKOUT_FAILED:
        return { ...state, isLoading: false, order: null, errMess: action.payload };
      default:
        return state;
    }
  };