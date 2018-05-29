/*
 *
 * HomePage actions
 *
 */

import {
  CALL_SET_PAGE,
  CALL_SET_TAG,
  CALL_SET_TAB,
  CALL_SET_FAVORITE,
  CALL_GET_TAGS,
} from './constants';

export const setPage = (page) => ({
  type: CALL_SET_PAGE,
  page,
});

export const setTag = (tag) => ({
  type: CALL_SET_TAG,
  tag,
});

export const setTab = (tab, username, typeTab) => ({
  type: CALL_SET_TAB,
  tab,
  username,
  typeTab,
});

export const setFavorite = (article) => ({
  type: CALL_SET_FAVORITE,
  article,
});

// export const allReset = () => ({
//   type: CALL_RESET_ARTICLES,
// });

export const callGetTags = () => ({
  type: CALL_GET_TAGS,
});
