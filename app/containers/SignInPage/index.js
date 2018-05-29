/**
 *
 * SignInPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
// import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SignIn from 'components/SignIn';
import makeSelectSignInPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { callSignIn } from './actions';
// import messages from './messages';
import SignInWrapper from './SignInWrapper';

export class SignInPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      actHandleSignIn,
      signinpage,
      history,
    } = this.props;

    return (
      <SignInWrapper>
        <Helmet>
          <title>SignInPage</title>
          <meta name="description" content="Description of SignInPage" />
        </Helmet>

        <SignIn
          handleSignIn={actHandleSignIn}
          isLogin={signinpage.isLogin}
          listError={signinpage.listError}
          history={history}
        />
      </SignInWrapper>
    );
  }
}

SignInPage.propTypes = {
  actHandleSignIn: PropTypes.func,
  signinpage: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  signinpage: makeSelectSignInPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    actHandleSignIn: (email, password) => { dispatch(callSignIn(email, password)); },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signInPage', reducer });
const withSaga = injectSaga({ key: 'signInPage', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(SignInPage);
