/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_PROFILE,
  CALL_UNMOUNT,
  SET_ISLOAD,
} from './constants';

const initialState = fromJS({
  user: {},
  profile: {},
  isLoad: false,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return state
        .set('profile', action.profile)
        .set('isLoad', false);
    case SET_ISLOAD:
      return state
        .set('isLoad', true);
    case CALL_UNMOUNT:
      return state
        .set('isLoad', false);
    default:
      return state;
  }
}

export default profilePageReducer;
