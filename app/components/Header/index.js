/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Logo from 'components/common/Logo';
import Navbar from 'components/Navbar';

import WrapperHeader from './WrapperHeader';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      user,
    } = this.props;
    return (
      <WrapperHeader className="navbar navbar-light">
        <div className="container">
          <Logo />
          <Navbar
            user={user}
          />
        </div>
      </WrapperHeader>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
