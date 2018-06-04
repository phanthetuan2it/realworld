import { all, fork, call, put } from 'redux-saga/effects';
import { apiGetInfoUser, dataUserToken } from 'utils/api';
import { GET_USER } from './constants';
import axios from 'axios';

function* getUser() {
  // const resource = 'users';
  const apiUrl = 'http://localhost:3000/graphql';
  // const params = {first_name: "Babbie", last_name: "", department: "", country: ""};
  // const fields = `{id, first_name, last_name, email, department, todo_count, country}`;
  // const courseID = 1;
  const query = `{
    getSingleCourse($courseID: Int!) {
      course(id: $courseID) {
          title
          author
          description
          topic
          url
      }
    }
  }`;

  const queryAll = `{
    courses {
        title
        author
        description
        topic
        url
    }
  }`;

  const variables = {courseID: 1}

  console.log(JSON.stringify({variables}));

  // const queryOne = `query myQuery{
  //   course(id: ${1}) {
  //       title
  //       topic
  //       description
  //   }"
  // }`;
  // const queryOne = graphql`
  //   query myQuery {
  //     courses {
  //       title
  //       topic
  //       description
  //     }
  //   }
  // `;

//   const queryAll = `{
//     courses {
//         title
//         topic
//         description
//     }
// }`;
  const data = yield fetch(apiUrl, {
      method: 'POST',
      // mode: 'cors',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }),
      body: JSON.stringify({
        query: queryAll,
        variables: variables,
      }),
  }).then((res) => {
    console.log(res.json());
  });

  // console.log(JSON.parse(queryOne));
  // console.log(JSON.stringify(queryOne));
  // console.log(queryOne);
  // console.log(JSON.stringify(queryOne));
  // const valChange = JSON.stringify(queryOne);
  // console.log(`{${valChange}}`);

  // const data2 = yield axios({
  //    method: 'POST',
  //    url: apiUrl,
  //    headers: {
  //        'Content-Type': 'application/json',
  //        'Accept': 'application/json',
  //    },
  //   //  data: queryOne,
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
