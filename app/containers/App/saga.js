import { all, fork, call, put } from 'redux-saga/effects';
import { apiGetInfoUser, dataUserToken } from 'utils/api';
import { GET_USER } from './constants';

function* getUser() {
  if(dataUserToken) {
    const userInfo = yield call(apiGetInfoUser);
    yield put({
      type: GET_USER,
      user: userInfo.data.user,
    });
  } else {
    yield put({
      type: GET_USER,
      user: {},
    });
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    fork(getUser),
  ]);
}
