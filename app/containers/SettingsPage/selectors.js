import { createSelector } from 'reselect';

/**
 * Direct selector to the settingsPage state domain
 */
const selectSettingsPageDomain = (state) => state.get('settingsPage');

// const makeSelectApp = () => createSelector(
//   selectApp,
//   (substate) => substate.toJS()
// );


const makeSelectSettingsPage = () => createSelector(
  selectSettingsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSettingsPage;
export {
  selectSettingsPageDomain,
};
