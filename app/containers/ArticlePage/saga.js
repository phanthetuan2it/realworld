import {
  // take,
  call,
  put,
  select,
  all,
  takeLatest,
} from 'redux-saga/effects';
import {
  apiGetInfoUser,
  apiGetArticle,
  apiGetComments,
  apiCallFollow,
  apiCallFavorited,
  apiPostComments,
  apiDeleteComments,
  apiDeleteArticle,
} from 'utils/api';
import { push } from 'react-router-redux';
import {
  CALL_GET_ARTICLE,
  CALL_FAVORITED,
  CALL_FOLLOW,
  SET_ARTICLE,
  CALL_POST_COMMENT,
  CALL_DELETE_COMMENT,
  CALL_DELETE_ARTICLE,
} from './constants';
import makeSelectArticlePage from './selectors';

function* getArticle(action) {
  const {
    article,
    user,
    comments,
  } = yield all({
    article: call(apiGetArticle, action.slug),
    comments: call(apiGetComments, action.slug),
    user: call(apiGetInfoUser),
  });

  if (article.request.status === 404) {
    yield put(push('/'));
  }

  yield put({
    type: SET_ARTICLE,
    article: article.data.article,
    comments: comments.data.comments,
    user: user.data ? user.data.user : {},
  });
}

function* callFollow() {
  try {
    const payload = yield select(makeSelectArticlePage());
    yield call(apiCallFollow, payload.article.author);
    const article = {
      ...payload.article,
      author: {
        ...payload.article.author,
        following: !payload.article.author.following,
      },
    };

    yield put({
      type: SET_ARTICLE,
      article,
      comments: payload.comments,
      user: payload.user,
    });
  } catch (error) {
    // console.log(error);
  }
}

function* callFavorited() {
  try {
    const payload = yield select(makeSelectArticlePage());
    const data = yield call(apiCallFavorited, payload.article);
    yield put({
      type: SET_ARTICLE,
      article: data.data.article,
      comments: payload.comments,
      user: payload.user,
    });
  } catch (error) {
    // console.log(err);
  }
}

function* callPostComment(action) {
  try {
    if (action.comment !== '') {
      const payload = yield select(makeSelectArticlePage());
      const article = payload.article;
      const data = yield call(apiPostComments, article.slug, action.comment);
      const comments = yield payload.comments;
      yield comments.unshift(data.data.comment);

      yield put({
        type: SET_ARTICLE,
        article,
        comments,
        user: payload.user,
      });
    }
  } catch (error) {
    // console.log(error);
  }
}

function* callDeleteComment(action) {
  try {
    const payload = yield select(makeSelectArticlePage());
    const article = payload.article;
    yield call(apiDeleteComments, article.slug, action.id);
    const comments = yield payload.comments;
    const indexComment = comments.findIndex((item) => item.id === action.id);
    yield comments.splice(indexComment, 1);

    yield put({
      type: SET_ARTICLE,
      article,
      comments,
      user: payload.user,
    });
  } catch (error) {
    // console.log(error);
  }
}

function* callDeleteArtilce() {
  try {
    const payload = yield select(makeSelectArticlePage());
    const article = payload.article;
    yield call(apiDeleteArticle, article.slug);
    yield put(push('/'));
  } catch (error) {
    // console.log(error);
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(CALL_GET_ARTICLE, getArticle),
    takeLatest(CALL_FOLLOW, callFollow),
    takeLatest(CALL_FAVORITED, callFavorited),
    takeLatest(CALL_POST_COMMENT, callPostComment),
    takeLatest(CALL_DELETE_COMMENT, callDeleteComment),
    takeLatest(CALL_DELETE_ARTICLE, callDeleteArtilce),
  ]);
}
