/*
 *
 * ProfilePage actions
 *
 */

import {
  GET_PROFILE,
  CALL_UNMOUNT,
  CALL_FOLLOW,
} from './constants';

export function getProfile(username) {
  return {
    type: GET_PROFILE,
    username,
  };
}

export function callFollow(username) {
  return {
    type: CALL_FOLLOW,
    username,
  };
}
export function callUnMount() {
  return {
    type: CALL_UNMOUNT,
  };
}
