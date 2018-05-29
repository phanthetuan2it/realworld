import { urlApi, userToken } from 'constants/index';
import { GET_USER } from 'containers/App/constants';
import { SET_TAB } from 'containers/HomePage/constants';
import { Api, setItem, getUserToken } from 'utils/helpers';
import { setTokenInApi } from 'utils/api';
import { push } from 'react-router-redux';
import { forEach } from 'lodash';
import {
  takeLatest,
  all,
  put,
  call,
  fork,
} from 'redux-saga/effects';
import {
  CALL_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from './constants';

function* signIn(action) {
  let data;
  try {
    data = yield call(
      Api,
      {
        url: `${urlApi}users/login`,
        method: 'POST',
        data: {
          user: {
            email: action.email,
            password: action.password,
          },
        },
      }
    );

    const listError = [];
    if (data.response && data.response.status === 422) {
      yield forEach(data.response.data.errors, (value, key) => {
        listError.push(`${key} ${value}`);
      });
      yield put({
        type: SIGN_IN_FAIL,
        listError,
      });
    } else {
      // call data user in App
      yield put({
        type: GET_USER,
        user: data.data.user,
      });
      // call set tab in home page
      yield put({
        type: SET_TAB,
        curTab: 'feed',
      });
      // set local store user
      yield setItem(userToken, data.data.user.token);
      yield setTokenInApi(data.data.user.token);
      yield put({
        type: SIGN_IN_FAIL,
        listError,
      });
      yield put(push('/'));
    }
  } catch (error) {
    yield put({
      type: SIGN_IN_FAIL,
      err: 'Password or email invalid',
    });
  }
}

function* checkSignIn() {
  try {
    const dataToken = yield getUserToken();
    if (dataToken) {
      yield put({ type: SIGN_IN_SUCCESS });
    }
  } catch (error) {
    yield put({
      type: SIGN_IN_FAIL,
      err: 'Password or email invalid',
    });
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    fork(checkSignIn),
    takeLatest(CALL_SIGN_IN, signIn),
  ]);
}
