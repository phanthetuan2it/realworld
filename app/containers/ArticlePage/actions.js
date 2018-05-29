/*
 *
 * ArticlePage actions
 *
 */

import {
  CALL_GET_ARTICLE,
  CALL_FAVORITED,
  CALL_FOLLOW,
  DEFAULT_ACTION,
  CALL_POST_COMMENT,
  CALL_DELETE_COMMENT,
  CALL_DELETE_ARTICLE,
} from './constants';

export function getArticle(slug) {
  return {
    type: CALL_GET_ARTICLE,
    slug,
  };
}

export function callFollow(username) {
  return {
    type: CALL_FOLLOW,
    username,
  };
}

export function callFavorited(slug) {
  return {
    type: CALL_FAVORITED,
    slug,
  };
}
export function callPostComment(comment) {
  return {
    type: CALL_POST_COMMENT,
    comment,
  };
}

export function callDeleteComment(id) {
  return {
    type: CALL_DELETE_COMMENT,
    id,
  };
}

export function callDeleteArticle() {
  return {
    type: CALL_DELETE_ARTICLE,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
