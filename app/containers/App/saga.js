import { all, fork, call, put } from 'redux-saga/effects';
import { apiGetInfoUser } from 'utils/api';
import { GET_USER } from './constants';

function* getUser() {
  const userInfo = yield call(apiGetInfoUser);
  yield put({
    type: GET_USER,
    user: userInfo.data.user,
  });
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    fork(getUser),
  ]);
}
