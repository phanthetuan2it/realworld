/*
 *
 * SignInPage actions
 *
 */

import {
  CALL_SIGN_IN,
} from './constants';

export function callSignIn(email, password) {
  return {
    type: CALL_SIGN_IN,
    email,
    password,
  };
}
