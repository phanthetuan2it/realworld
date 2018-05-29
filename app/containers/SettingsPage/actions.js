/*
 *
 * SettingsPage actions
 *
 */

import {
  CALL_UPDATE,
  CALL_LOGOUT,
  WAIT_GET_USER,
} from './constants';

export function callUpdate(options) {
  return {
    type: CALL_UPDATE,
    options,
  };
}
export function callLogout() {
  return {
    type: CALL_LOGOUT,
  };
}

export function waitGetUser() {
  return {
    type: WAIT_GET_USER,
  };
}
