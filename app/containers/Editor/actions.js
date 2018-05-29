/*
 *
 * Editor actions
 *
 */

import {
  POST_ARTICLE,
  GET_ARTICLE,
  RESET_ARTICLE,
  ADD_TAG,
  REMOVE_TAG,
} from './constants';

export function postArticle(data) {
  return {
    type: POST_ARTICLE,
    data,
  };
}

export function getArticle(slug) {
  return {
    type: GET_ARTICLE,
    slug,
  };
}
export function resetArticle() {
  return {
    type: RESET_ARTICLE,
  };
}

export function addTag(tag) {
  return {
    type: ADD_TAG,
    tag,
  };
}

export function removeTag(article) {
  return {
    type: REMOVE_TAG,
    article,
  };
}
