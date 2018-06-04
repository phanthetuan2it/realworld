import { all, fork, call, put } from 'redux-saga/effects';
import { apiGetInfoUser, dataUserToken } from 'utils/api';
import { GET_USER } from './constants';

function* getUser() {
  // const resource = 'users';
  // const apiUrl = 'http://localhost:3000/graphql';
  // const params = {first_name: "Babbie", last_name: "", department: "", country: ""};
  // const fields = `{id, first_name, last_name, email, department, todo_count, country}`;
  // const query = `{
  //     courses {
  //         title
  //         topic
  //         description
  //     }
  // }`;
  // const data = yield fetch(apiUrl, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: new Headers({
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //     }),
  //     body: JSON.stringify({query}),
  // }).then((res) => {
  //     console.log(res.json());
  // });

  // const data2 = axios({
  //    method: 'POST',
  //    url: apiUrl,
  //    headers: {
  //        'Content-Type': 'application/json',
  //        'Accept': 'application/json',
  //    },
  //    data: JSON.stringify({query}),
  //  })

  if (dataUserToken) {
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
