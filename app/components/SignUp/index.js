/**
*
* SignUp
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Link } from 'react-router-dom';
class SignUp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  onChangeName = (e) => {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleSignUp = (e) => {
    e.preventDefault();
    this.props.callSignUp({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    });
  }

  render() {
    const { listError } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/signin">Have an account?</Link>
              </p>

              <ul className="error-messages">
                {listError && listError.map((item) =>
                  <li key={item}>{item}</li>
                )}
              </ul>

              <form onSubmit={this.handleSignUp}>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Your Name" value={this.state.name} onChange={this.onChangeName} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="text" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg" type="password" placeholder="Password" value={this.state.value} onChange={this.onChangePassword} />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Sign up
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  listError: PropTypes.array,
  callSignUp: PropTypes.func,
};

export default SignUp;
