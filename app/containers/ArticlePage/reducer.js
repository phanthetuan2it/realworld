/*
 *
 * ArticlePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_ARTICLE,
} from './constants';

const initialState = fromJS({
  article: {},
  comments: [],
  user: {},
});

function articlePageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARTICLE:
      return state
        .set('article', action.article)
        .set('comments', action.comments)
        .set('user', action.user);
    default:
      return state;
  }
}

export default articlePageReducer;
