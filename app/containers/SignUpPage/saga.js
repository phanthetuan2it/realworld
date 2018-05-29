import { forEach } from 'lodash';
import { push } from 'react-router-redux';
import { setItem } from 'utils/helpers';
import { apiCallSignUp } from 'utils/api';
import { userToken } from 'constants/index';
import { GET_USER } from 'containers/App/constants';
import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  SIGN_UP,
  SIGN_UP_FAIL,
} from './constants';

function* callSignUp(action) {
  try {
    const data = yield call(apiCallSignUp, action.data);
    const listError = [];
    if (data.response && data.response.status === 422) {
      forEach(data.response.data.errors, (value, key) => {
        listError.push(`${key} ${value}`);
      });

      yield put({
        type: SIGN_UP_FAIL,
        listError,
      });
    } else {
      yield put({
        type: GET_USER,
        user: data.data.user,
      });
      yield setItem(userToken, data.data.user.token);
      yield put({
        type: SIGN_UP_FAIL,
        listError,
      });
      yield put(push('/'));
    }
  } catch (error) {
    // console.log(error);
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeLatest(SIGN_UP, callSignUp),
  ]);
}
