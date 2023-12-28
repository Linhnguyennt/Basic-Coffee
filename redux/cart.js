import * as ActionTypes from './ActionTypes';

export const cart = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const item = state.find((item) => item.dishId === action.payload.dishId);
      if (item) {
        // Nếu đã có món ăn trong giỏ hàng, cập nhật số lượng
        return state.map((item) =>
          item.dishId === action.payload.dishId
            ? { ...item, quantity: action.payload.quantity + 1 }
            : item
        );
      } else {
        // Nếu chưa có món ăn trong giỏ hàng, thêm mới
        return [...state, { dishId: action.payload.dishId, quantity: action.payload.quantity }];
      }
      case ActionTypes.UPDATE_QUANTITY:
        return state.map((item) =>
          item.Id === action.payload.dishId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
    case ActionTypes.DELETE_CART:
      return state.filter((cartItem) => cartItem.dishId !== action.payload);
    default:
      return state;
  }
};