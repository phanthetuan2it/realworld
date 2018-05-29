/*
 *
 * SettingsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE,
  UPDATE_FAIL,
} from './constants';

const initialState = fromJS({
  user: {},
  listError: [],
});

function settingsPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return state;
    case UPDATE_FAIL:
      return state
        .set('listError', action.listError);

    default:
      return state
        .set('listError', []);
  }
}

export default settingsPageReducer;
