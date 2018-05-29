/**
*
* Banner
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router-dom';
import messages from './messages';
import BannerWrapper from './BannerWrapper';

function Banner() {
  return (
    <BannerWrapper className="banner">
      <div className="container">
        <h1><FormattedMessage {...messages.banner} /></h1>
        <p><FormattedMessage {...messages.bannerSlogan} /></p>
      </div>
    </BannerWrapper>
  );
}

Banner.propTypes = {

};

export default Banner;
