/**
*
* SettingsForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import SettingsWrapper from './SettingsWrapper';

class SettingsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      image: user.image,
      username: user.username,
      bio: user.username,
      email: user.bio,
      password: user.email,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const { user } = nextProps;
  //   this.state = {
  //     image: user.image ? user.image : '',
  //     username: user.username ? user.username : '',
  //     bio: user.bio ? user.bio : '',
  //     email: user.email ? user.email : '',
  //     password: '',
  //   };
  // }

  updateState = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const { callUpdate } = this.props;
    const data = {
      image: this.state.image,
      username: this.state.username,
      bio: this.state.bio,
      email: this.state.email,
    };
    if (this.state.password !== '') {
      data.password = this.state.password;
    }
    callUpdate(data);
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
    const { callLogout } = this.props;
    return (
      <SettingsWrapper className="settings-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {this.renderError()}
              <form onSubmit={(e) => this.handleUpdate(e)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control" value={this.state.image} type="text" placeholder="URL of profile picture" onChange={this.updateState('image')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="username" className="form-control form-control-lg" value={this.state.username} type="text" placeholder="Your Name" onChange={this.updateState('username')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea name="bio" className="form-control form-control-lg" value={this.state.bio} rows="8" placeholder="Short bio about you" onChange={this.updateState('bio')}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="email" className="form-control form-control-lg" value={this.state.email} type="text" placeholder="Email" onChange={this.updateState('email')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input name="password" className="form-control form-control-lg" type="password" placeholder="Password" value={this.state.password} onChange={this.updateState('password')} />
                  </fieldset>
                  <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <button className="btn btn-outline-danger" onClick={callLogout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </SettingsWrapper>
    );
  }
}

SettingsForm.propTypes = {
  user: PropTypes.object,
  callUpdate: PropTypes.func,
  listError: PropTypes.array,
  callLogout: PropTypes.func,
};

export default SettingsForm;
