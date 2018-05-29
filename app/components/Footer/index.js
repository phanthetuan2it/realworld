/**
*
* Footer
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import FooterWrapper from './FooterWrapper';

function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <FormattedMessage {...messages.header} />
      </div>
    </FooterWrapper>
  );
}

Footer.propTypes = {

};

export default Footer;
