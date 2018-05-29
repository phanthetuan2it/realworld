import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = (state) => state.get('homePage');

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate && substate.toJS(),
);

const makeSelectArticles = () => createSelector(
  selectHomePageDomain,
  (substate) => substate && substate.get('articles'),
);

const makeSelectTags = () => createSelector(
  selectHomePageDomain,
  (substate) => substate && substate.get('tags'),
);

const makeSelectArticlesCount = () => createSelector(
  selectHomePageDomain,
  (substate) => substate && substate.get('articlesCount'),
);

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectArticles,
  makeSelectArticlesCount,
  makeSelectTags,
};
