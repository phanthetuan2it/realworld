import { createSelector } from 'reselect';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = (state) => state.get('profilePage');


/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilePage
 */


const makeSelectProfilePage = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate && substate.toJS()
);


const makeSelectProfile = () => createSelector(
  makeSelectProfilePage(),
  (substate) => substate && substate.profile
);

export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectProfile,
};
