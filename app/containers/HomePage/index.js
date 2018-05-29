/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Articles from 'components/Articles';
import Tags from 'components/Tags';
import { getUserToken } from 'utils/helpers';
import Banner from 'components/Banner';
import {
  setPage,
  setTag,
  setTab,
  setFavorite,
  callGetTags,
} from './actions';
import makeSelectHomePage,
{
  // makeSelectArticles,
  // makeSelectTags,
  makeSelectArticlesCount,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import HomePageWrapper from './HomePageWrapper';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount = () => {
    const dataToken = getUserToken();
    this.props.setDataTab(dataToken ? 'feed' : 'articles');
    this.props.callGetDataTags();
  }

  getListTab = () => {
    const { homePage } = this.props;
    const dataToken = getUserToken();
    const listTab = [
      {
        label: 'Global Feed',
        tab: 'articles',
      },
    ];

    if (dataToken) {
      listTab.unshift({
        label: 'Your feed',
        tab: 'feed',
      });
    }

    if (homePage.curTag) {
      listTab.push({
        label: `# ${homePage.curTag}`,
        tab: 'tag',
      });
    }
    return listTab;
  }

  render() {
    const {
      homePage,
      paging,
      setDataPage,
      setDataTag,
      setDataTab,
      setDataFavorite,
    } = this.props;

    return (
      <HomePageWrapper className="home-page">
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9 col-sm-9 col-xs-12">
              <Articles
                // articles={articles}
                paging={paging}
                setPage={setDataPage}
                setTab={setDataTab}
                setFavorite={setDataFavorite}
                tag={homePage.curTag}
                listTab={this.getListTab()}
                {...homePage}
              />
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags
                  tags={homePage.tags}
                  setTag={setDataTag}
                />
              </div>
            </div>
          </div>
        </div>
      </HomePageWrapper>
    );
  }
}

HomePage.propTypes = {
  homePage: PropTypes.object,
  paging: PropTypes.number,
  setDataFavorite: PropTypes.func,
  setDataPage: PropTypes.func,
  setDataTab: PropTypes.func,
  setDataTag: PropTypes.func,
  callGetDataTags: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  paging: makeSelectArticlesCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    setDataPage: (page) => dispatch(setPage(page)),
    setDataTag: (tag) => dispatch(setTag(tag)),
    setDataTab: (tab) => dispatch(setTab(tab)),
    setDataFavorite: (slug) => dispatch(setFavorite(slug)),
    callGetDataTags: () => dispatch(callGetTags()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(HomePage);
