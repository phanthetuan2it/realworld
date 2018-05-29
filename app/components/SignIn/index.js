/**
*
* SignIn
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getItem } from 'utils/helpers';
import { userToken } from 'constants/index';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SignInWrapper from './SignInWrapper';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
    };
  }

  componentWillMount = () => {
    const localUser = getItem(userToken);
    this.setState({
      isLogin: localUser,
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  onLogin = (e) => {
    e.preventDefault();
    this.props.handleSignIn(this.state.email, this.state.password);
  }

  renderError = () => {
    const {
      listError,
    } = this.props;
    return (
      <ul className="error-messages">
        {listError && listError.map((item) =>
          <li key={item}>{item}</li>
        )}
      </ul>
    );
  }

  render() {
    return (
      this.state.isLogin
      ?
        <Redirect to="/" />
      :
        <SignInWrapper>
          <div className="auth-page">
            <div className="container page">
              <div className="row">

                <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">{messages.header.defaultMessage}</h1>
                  <p className="text-xs-center">
                    <Link to="/signup">Need an account?</Link>
                  </p>
                  {this.renderError()}
                  <form onSubmit={this.onLogin} method="/" action="#" encType="multipart/form-data">
                    <fieldset className="form-group">
                      <input value={this.state.email} className="form-control form-control-lg" type="text" placeholder="Email" onChange={this.onChangeEmail} />
                    </fieldset>
                    <fieldset className="form-group">
                      <input value={this.state.password} className="form-control form-control-lg" type="password" placeholder="Password" onChange={this.onChangePassword} />
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </SignInWrapper>
    );
  }
}


SignIn.propTypes = {
  listError: PropTypes.array,
  // history: PropTypes.object,
  handleSignIn: PropTypes.func,
};

export default SignIn;
