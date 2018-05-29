/*
 *
 * Editor reducer
 *
 */

import { fromJS } from 'immutable';
import {
  // ADD_TAG,
  SET_ARTICLE,
  RESET_ARTICLE,
} from './constants';

const initialState = fromJS({
  listTags: [],
  article: {},
});

function editorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return state
        .set('article', action.article);
    case RESET_ARTICLE:
      return state.set('article', {});
    default:
      return state;
  }
}

export default editorReducer;
