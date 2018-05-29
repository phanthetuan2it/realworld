import {
  all,
  call,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  apiGetArticles,
  apiGetArticlesFeed,
  apiGetTags,
  apiCallFavorited,
} from 'utils/api';
import { round } from 'lodash';
import { selectHomePageDomain } from './selectors';
import {
  LIMIT_ITEMS,
  GET_ARTICLES,
  RESET_ARTICLES,
  GET_TAGS,
  CALL_SET_PAGE,
  SET_PAGE,
  CALL_SET_TAG,
  SET_TAG,
  CALL_SET_TAB,
  SET_TAB,
  CALL_SET_FAVORITE,
  CALL_GET_TAGS,
} from './constants';

function* resetArticles() {
  yield put({ type: RESET_ARTICLES });
}

function* getDataArticles() {
  try {
    let data;
    let result = yield select(selectHomePageDomain);
    result = yield result && result.toJS();

    const params = {
      limit: result.limit,
      offset: result.curPage * result.limit,
    };

    if (result.curTag !== '') {
      params.tag = result.curTag;
    }

    if (result.username !== '' && result.curTab === 'author') {
      params.author = result.username;
    }

    if (result.username !== '' && result.curTab === 'favorites') {
      params.favorited = result.username;
    }

    if (result.curTab === 'feed') {
      data = yield call(apiGetArticlesFeed, params);
    } else {
      data = yield call(apiGetArticles, params);
    }

    yield put({
      type: GET_ARTICLES,
      data: data.data,
      curPage: result.curPage,
      curTag: result.curTag,
      articlesCount: round(data.data.articlesCount / LIMIT_ITEMS),
    });
  } catch (error) {
    // console.log(error);
  }
}

function* getTags() {
  try {
    const data = yield call(apiGetTags);
    yield put({
      type: GET_TAGS,
      data: data.data.tags,
    });
  } catch (err) {
    //
  }
}

function* setPage(action) {
  try {
    yield put({
      type: SET_PAGE,
      curPage: action.page,
    });
    yield getDataArticles();
  } catch (err) {
    //
  }
}

function* setTag(action) {
  try {
    yield resetArticles();
    yield put({
      type: SET_TAG,
      curTag: action.tag,
      curTab: 'tag',
      curPage: 0,
      offset: 0,
    });

    yield getDataArticles();
  } catch (err) {
    //
  }
}

function* setTab(action) {
  try {
    const username = action.username ? action.username : '';
    yield resetArticles();
    yield put({
      type: SET_TAB,
      curTab: action.tab,
      username,
    });
    yield getDataArticles();
  } catch (error) {
    // yield console.log(error);
  }
}

function* setFavorite(action) {
  try {
    yield call(apiCallFavorited, action.article);
    yield getDataArticles();
  } catch (error) {
    //
  }
}

// function* setTabDefault() {
//   try {
//     const tabDefault = yield dataUserToken ? 'feed' : 'articles';
//     yield put({
//       type: SET_TAB,
//       curTab: tabDefault,
//     });
//   } catch (err) {
//     //
//   }
// }
// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeLatest(CALL_GET_TAGS, getTags),
    takeLatest(CALL_SET_PAGE, setPage),
    takeLatest(CALL_SET_TAG, setTag),
    takeLatest(CALL_SET_TAB, setTab),
    takeLatest(CALL_SET_FAVORITE, setFavorite),
  ]);
}
