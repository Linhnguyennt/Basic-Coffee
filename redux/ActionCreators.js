import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// dishes
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());
  return fetch(baseUrl + 'dishes')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};
const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});
const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});
const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then((response) => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// favorites
export const postFavorite = (dishId) => (dispatch) => {
  dispatch(addFavorite(dishId));
};
const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
});

export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId
});

// comments
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  var newcmt = { dishId: dishId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
 // dispatch(addComment(newcmt));
 fetch(baseUrl + 'comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newcmt)
}).then((response) => {
    if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
    else return response.json();
  })
  .then((cmt) => dispatch(addComment(cmt)))
  .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt
});

// users
export const loginUser = (userinfo) => ({
  type: ActionTypes.LOGIN_USER,
  payload: userinfo
});
export const logoutUser = () => ({
  type: ActionTypes.LOGOUT_USER,
  payload: null
});

export const checkoutCart = (cart) => (dispatch) => {
  dispatch(checkoutLoading());

  // Make an API call or perform necessary operations here

  // Example actions
  dispatch(checkoutSuccess());
  // or
  dispatch(checkoutFailed('Error message'));
};

// cart
export const checkoutLoading = () => ({
  type: ActionTypes.CHECKOUT_LOADING,
});

export const checkoutSuccess = () => ({
  type: ActionTypes.CHECKOUT_SUCCESS,
});

export const checkoutFailed = (errmess) => ({
  type: ActionTypes.CHECKOUT_FAILED,
  payload: errmess,
});




export const postCart = (dishId, quantity) => (dispatch) => {
  dispatch(addToCart(dishId, quantity));
};
export const addToCart = (dishId, quantity) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: {
    dishId: dishId,
    quantity: quantity
  }
});

export const deleteCart = (dishId) => ({
  type: ActionTypes.DELETE_CART,
  payload: dishId
});

export const updateQuantity = (dishId, quantity) => ({
  type: ActionTypes.UPDATE_QUANTITY,
  payload: { dishId, quantity },
});

const addMessage = (newmessage) => ({
  type: ActionTypes.ADD_MESSAGE,
  payload: newmessage
});




// comments
export const postmessage = (author, comment) => (dispatch) => {
  var newmessage = {author: author, comment: comment, date: new Date().toISOString() };
 dispatch(addMessage(newmessage));
 fetch(baseUrl + 'message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newmessage)
}).then((response) => {
    if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
    else return response.json();
  })
  .then((newmessage) => dispatch(addMessage(newmessage)))
  .catch((error) => dispatch(commentsFailed(error.message)));
};