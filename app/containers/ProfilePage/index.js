/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  setPage,
  setTag,
  setTab,
  setFavorite,
} from 'containers/HomePage/actions';
import makeSelectHomePage, { makeSelectArticles } from 'containers/HomePage/selectors';
import { makeSelectUser } from 'containers/App/selectors';
import reducerHomePage from 'containers/HomePage/reducer';
import sagaHomePage from 'containers/HomePage/saga';
import Profile from 'components/Profile';
import { getProfile, callFollow, callUnMount } from './actions';
// import { FormattedMessage } from 'react-intl';
import makeSelectProfilePage, { makeSelectProfile } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

class ProfilePage extends React.Component {
  componentWillMount() {
    const { match, getDataProfile, setDataTab } = this.props;
    const username = match.params.username;
    getDataProfile(username);
    setDataTab('author', username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      const username = nextProps.match.params.username;
      nextProps.getDataProfile(username);
      nextProps.setDataTab('author', username);
    }
  }

  componentWillUnmount() {
    this.props.actCallUnMount();
  }

  getListTab = () => {
    const { match } = this.props;
    const listTab = [
      {
        label: 'My articles',
        tab: 'author',
        href: `/@${match.params.username}`,
        type: 'link',
      },
      {
        label: 'Favorited Articles',
        tab: 'favorites',
        href: `/@${match.params.username}/favorites`,
        type: 'link',
      },
    ];
    return listTab;
  }
  render() {
    const {
      profile,
      homePage,
      setDataPage,
      setDataTab,
      setDataFavorite,
      user,
      actCallFollow,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>ProfilePage</title>
          <meta name="description" content="Description of ProfilePage" />
        </Helmet>
        <Profile
          user={user}
          profile={profile}
          homePage={homePage}
          setPage={setDataPage}
          setTab={setDataTab}
          setFavorite={setDataFavorite}
          callFollow={actCallFollow}
          listTab={this.getListTab()}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object,
  getDataProfile: PropTypes.func,
  setDataTab: PropTypes.func,
  setDataPage: PropTypes.func,
  setDataFavorite: PropTypes.func,
  actCallFollow: PropTypes.func,
  actCallUnMount: PropTypes.func,
  profile: PropTypes.object,
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage(),
  profile: makeSelectProfile(),
  articles: makeSelectArticles(),
  homePage: makeSelectHomePage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDataProfile: (username) => dispatch(getProfile(username)),
    setDataPage: (page) => dispatch(setPage(page)),
    setTag: (tag) => dispatch(setTag(tag)),
    setDataTab: (tab, username) => dispatch(setTab(tab, username)),
    setDataFavorite: (slug) => dispatch(setFavorite(slug)),
    actCallFollow: (username) => dispatch(callFollow(username)),
    actCallUnMount: () => dispatch(callUnMount()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

const withReducerHomePage = injectReducer({ key: 'homePage', reducer: reducerHomePage });
const withSagaHomePage = injectSaga({ key: 'homePage', saga: sagaHomePage });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withReducerHomePage,
  withSagaHomePage,
)(ProfilePage);

export { ProfilePage, mapStateToProps, mapDispatchToProps };
