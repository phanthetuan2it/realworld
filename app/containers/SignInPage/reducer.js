/*
 *
 * SignInPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SIGN_IN_FAIL,
} from './constants';

const initialState = fromJS({
  listError: [],
});

function signInPageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_FAIL:
      return state.set('listError', action.listError);
    default:
      return state;
  }
}

export default signInPageReducer;
