/*
 *
 * SignUpPage actions
 *
 */

import {
  SIGN_UP,
} from './constants';

export function callSignUp(data) {
  return {
    type: SIGN_UP,
    data,
  };
}
