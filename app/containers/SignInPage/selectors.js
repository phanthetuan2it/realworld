import { createSelector } from 'reselect';

/**
 * Direct selector to the signInPage state domain
 */
const selectSignInPageDomain = (state) => state.get('signInPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignInPage
 */

const makeSelectSignInPage = () => createSelector(
  selectSignInPageDomain,
  (substate) => substate.toJS()
);
// const makeSelectIsSignIn = () => createSelector(
//   makeSelectSignInPage(),
//   (substate) => substate.isSignIn
// );

// const makeSelectError = () => createSelector(
//   makeSelectSignInPage(),
//   (substate) => substate.err
// );

export default makeSelectSignInPage;
export {
  selectSignInPageDomain,
};
