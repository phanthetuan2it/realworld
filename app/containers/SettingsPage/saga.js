import { take, call, put, takeLatest, all } from 'redux-saga/effects';
import { userToken } from 'constants/index';
import { GET_USER } from 'containers/App/constants';
import { setItem, removeItem } from 'utils/helpers';
import { push } from 'react-router-redux';
import { forEach } from 'lodash';
import { apiUpdateInfoUser } from 'utils/api';
import {
  CALL_UPDATE,
  CALL_LOGOUT,
  UPDATE_FAIL,
  WAIT_GET_USER,
} from './constants';

function* callUpdate(action) {
  try {
    const data = { user: action.options };
    const dataUser = yield call(apiUpdateInfoUser, data);
    const listError = [];
    if (dataUser.response && dataUser.response.status === 422) {
      yield forEach(dataUser.response.data.errors, (value, key) => {
        listError.push(`${key} ${value}`);
      });
    } else {
      yield put({
        type: GET_USER,
        user: dataUser.data.user,
      });
      yield setItem(userToken, dataUser.data.user.token);
      yield put(push(`/@${dataUser.data.user.username}`));
    }

    yield put({
      type: UPDATE_FAIL,
      listError,
    });
  } catch (error) {
    // console.log(error);
  }
}

function* callLogout() {
  try {
    yield put(push('/'));
    yield removeItem(userToken);
  } catch (error) {
    // console.log(error);
  }
}

function* waitGetUser() {
  yield take(GET_USER);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    takeLatest(CALL_UPDATE, callUpdate),
    takeLatest(CALL_LOGOUT, callLogout),
    takeLatest(WAIT_GET_USER, waitGetUser),
  ]);
}
