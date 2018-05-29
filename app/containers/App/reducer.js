/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USER,
} from './constants';

const initialState = fromJS({
  user: {},
  appLoaded: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return state
        .set('user', action.user)
        .set('appLoaded', true);
    default:
      return state;
  }
}

export default appReducer;
