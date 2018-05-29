import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { apiGetProfile, apiCallFollow } from 'utils/api';
import makeSelectProfilePage from './selectors';
import {
  GET_PROFILE,
  SET_PROFILE,
  CALL_FOLLOW,
  SET_ISLOAD,
} from './constants';

function* getProfile(action) {
  try {
    const {
      data,
    } = yield all({
      data: call(apiGetProfile, action.username),
      putData: put({
        type: SET_ISLOAD,
      }),
    });

    if (data.request.status === 404) {
      yield put(push('/'));
    } else {
      yield put({
        type: SET_PROFILE,
        profile: data.data.profile,
      });
    }
    // }
  } catch (error) {
    // yield console.log(error);
  }
}

function* callFollow(action) {
  try {
    const payload = yield select(makeSelectProfilePage());
    const data = yield call(apiCallFollow, payload.profile.following, action.username);
    yield put({
      type: SET_PROFILE,
      profile: data.data.profile,
    });
  } catch (error) {
    // console.log(error);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(CALL_FOLLOW, callFollow),
  ]);
}
