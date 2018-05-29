/*
 *
 * SignUpPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGN_UP_FAIL,
} from './constants';

const initialState = fromJS({
  listError: [],
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_FAIL:
      return state
        .set('listError', action.listError);
    default:
      return state;
  }
}

export default signUpPageReducer;
