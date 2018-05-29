import { takeLatest, call, put, select, all, take } from 'redux-saga/effects';
// import { urlApiArticles, urlApiTags } from 'constants/index';
// import { getUserToken } from 'utils/helpers';
import { push } from 'react-router-redux';
import { makeSelectUser } from 'containers/App/selectors';
import { GET_USER } from 'containers/App/constants';
import { apiCallArticle } from 'utils/api';
import { makeSelectEditor } from './selectors';
import {
  POST_ARTICLE,
  GET_ARTICLE,
  SET_ARTICLE,
} from './constants';

function* postArticle(action) {
  try {
    const payload = yield select(makeSelectEditor());
    const article = payload.article;
    const data = yield call(apiCallArticle, action.data, article);
    yield put(
      push(`/article/${data.data.article.slug}`),
    );
  } catch (error) {
    // console.log(error);
  }
}

function* getArticle(action) {
  try {
    // const dataToken = yield getUserToken();
    let user = yield select(makeSelectUser());
    if (!user.username) {
      yield take(GET_USER);
      user = yield select(makeSelectUser());
    }
    const data = yield call(
      apiCallArticle,
      false,
      {
        slug: action.slug,
      }
    );
    if (data.request.status === 404 || (user.username !== data.data.article.author.username)) {
      yield put(push('/'));
    } else {
      yield put({
        type: SET_ARTICLE,
        article: data.data.article,
      });
    }
  } catch (error) {
    // console.log(error);
  }
}

export default function* defaultSaga() {
  yield all([
    takeLatest(POST_ARTICLE, postArticle),
    takeLatest(GET_ARTICLE, getArticle),
  ]);
}
