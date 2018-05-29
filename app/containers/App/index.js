/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
// import HomePage from 'containers/HomePage';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import HomePage from 'containers/HomePage/Loadable';
import SignInPage from 'containers/SignInPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import Editor from 'containers/Editor/Loadable';
import ArticlePage from 'containers/ArticlePage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import ProfileFavorites from 'containers/ProfileFavorites/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LoadingPage from 'components/common/LoadingPage';
import AppWrapper from './AppWrapper';
import saga from './saga';
import reducer from './reducer';
import { makeSelectApp } from './selectors';

class App extends React.PureComponent {
  render() {
    const { dataApp } = this.props;
    if (dataApp.appLoaded) {
      return (
        <AppWrapper>
          <Header user={dataApp.user} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/editor/:slug" component={Editor} />
            <Route exact path="/editor" component={Editor} />
            <Route path="/article/:slug" component={ArticlePage} />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/@:username" component={ProfilePage} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </AppWrapper>
      );
    }
    return (
      <LoadingPage />
    );
  }
}

App.propTypes = {
  dataApp: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dataApp: makeSelectApp(),
});

const withConnect = connect(mapStateToProps, null);

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);
