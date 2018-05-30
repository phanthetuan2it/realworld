import axios from 'axios';
import { userToken } from 'constants/index';
import { imageDefault } from './constants';
// import { browserHistory, hashHistory } from 'react-router';
// export function findClosest(el, cls) {
//   while ((el = el.parentElement) && !el.classList.contains(cls) && el.tagName !== 'BODY') {
//     //
//   }
//   return el;
// }

export const parseJwt = (token) => {
  const base64 = token.split('.')[1].replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getItem = (tokenKey) => window
  && window.localStorage
  && window.localStorage.getItem(tokenKey);

export const setItem = (tokenKey, token) => window
  && window.localStorage
  && window.localStorage.setItem(tokenKey, token);

export const removeItem = (tokenKey) => window
  && window.localStorage
  && window.localStorage.removeItem(tokenKey);

export const Api = (options) => axios(options).catch((err) => err);

export const getUserToken = () => getItem(userToken);

export const convertDate = (str) => {
  const listMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new window.Date(str);
  return `${listMonth[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const checkErrorImage = (e) => (e.target.src = imageDefault);
