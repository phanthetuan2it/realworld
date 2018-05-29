import { createSelector } from 'reselect';

// const selectRoute = (state) => state.get('route');
const selectApp = (state) => state.get('app');
// const selectApp = (state) => state.get('signInPageReducer');
// const selectSignin = (state) => state.get('app');

// const makeSelectLocation = () => createSelector(
//   selectRoute,
//   (routeState) => routeState.get('location').toJS()
// );

const makeSelectApp = () => createSelector(
  selectApp,
  (appState) => appState.toJS()
);


const makeSelectUser = () => createSelector(
  makeSelectApp(),
  (appState) => appState.user
);

export {
  makeSelectApp,
  makeSelectUser,
  // selectRoute,
};
