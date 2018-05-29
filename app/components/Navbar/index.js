/**
*
* Navbar
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { checkErrorImage, getItem } from 'utils/helpers';
import { NavLink } from 'react-router-dom';
import { userToken } from 'constants/index';
// import messages from './messages';
import NavbarWrapper from './NavbarWrapper';
function Navbar(props) {
  const {
    user,
  } = props;
  const checkToken = getItem(userToken);
  const menuNormal = [
    {
      key: 'home',
      link: '/',
      exact: true,
      label: 'Home',
    },
    {
      key: 'signin',
      link: '/signin',
      exact: false,
      label: 'Sign in',
    },
    {
      key: 'signup',
      link: '/signup',
      exact: false,
      label: 'Sign up',
    },
  ];

  const menuUser = [
    {
      key: 'home',
      link: '/',
      exact: true,
      label: 'Home',
    },
    {
      key: 'editor',
      link: '/editor',
      exact: false,
      label: 'New Article',
    },
    {
      key: 'settings',
      link: '/settings',
      exact: false,
      label: 'Settings',
    },
    {
      key: 'user',
      link: `/@${user.username}`,
      exact: false,
      avatar: user.image,
      label: user.username,
    },
  ];

  return (
    <NavbarWrapper className="nav navbar-nav pull-xs-right">
      {
        checkToken
        ?
          menuUser.map((item) => (
            <li key={item.key} className="nav-item">
              <NavLink
                to={item.link}
                exact={item.exact}
                className="nav-link"
              >
                {item.avatar !== undefined
                ?
                  <img
                    src={item.avatar}
                    onError={checkErrorImage}
                    alt="avatar"
                    className="user-pic"
                  />
                :
                  ''
                }
                {item.label}
              </NavLink>
            </li>
          ))
        :
          menuNormal.map((item) => (
            <li key={item.key} className="nav-item">
              <NavLink
                to={item.link}
                exact={item.exact}
                className="nav-link"
              >
                {item.label}
              </NavLink>
            </li>
          ))
      }
    </NavbarWrapper>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
};

export default Navbar;
