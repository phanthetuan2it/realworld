/**
 *
 * SignUpPage
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
import SignUp from 'components/SignUp';
import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { callSignUp } from './actions';

export class SignUpPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      actCallSignUp,
      signuppage,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>SignUpPage</title>
          <meta name="description" content="Description of SignUpPage" />
        </Helmet>
        <SignUp
          callSignUp={actCallSignUp}
          listError={signuppage.listError}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  actCallSignUp: PropTypes.func,
  signuppage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  signuppage: makeSelectSignUpPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    actCallSignUp: (data) => dispatch(callSignUp(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpPage', reducer });
const withSaga = injectSaga({ key: 'signUpPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(SignUpPage);
