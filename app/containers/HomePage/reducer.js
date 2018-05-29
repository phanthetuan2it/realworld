/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LIMIT_ITEMS,
  GET_ARTICLES,
  RESET_ARTICLES,
  GET_TAGS,
  SET_PAGE,
  SET_TAG,
  SET_TAB,
  // SET_FAVORITED,
} from './constants';

const initialState = fromJS({
  articles: [],
  articlesCount: 0,
  tags: [],
  curTag: '',
  curPage: 0,
  curTab: '',
  username: '',
  limit: LIMIT_ITEMS,
  offset: 0,
  isLoading: {
    articles: true,
    tags: true,
  },
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return state
        .set('articles', action.data.articles)
        .set('articlesCount', action.articlesCount)
        .set('curPage', action.curPage)
        .set('curPage', action.curPage)
        .setIn(['isLoading', 'articles'], false);
    case RESET_ARTICLES:
      return state
        .set('articles', [])
        .set('articlesCount', 0)
        .setIn(['isLoading', 'articles'], true);
    case GET_TAGS:
      return state
      .set('tags', action.data)
      .setIn(['isLoading', 'tags'], false);
    case SET_PAGE:
      return state
      .set('curPage', action.curPage);
    case SET_TAG:
      return state
      .set('curTag', action.curTag)
      .set('curTab', action.curTab)
      .set('curPage', action.curPage)
      .set('offset', action.offset);
    // case SET_FAVORITED:
    //   const data = changeData(state.get('articles'), action.article);
    //   return state.set('articles', data);
    case SET_TAB:
      return state
      .set('curTab', action.curTab)
      .set('username', action.username)
      .set('curTag', '');
    default:
      return state;
  }
}

// function changeData(data, article) {
//   return data.map((item) => {
//     if (item.slug === article.slug) {
//       return {
//         ...item,
//         favorited: !item.favorited,
//       }
//     }
//     return {...item}
//   })
// }

export default homePageReducer;
