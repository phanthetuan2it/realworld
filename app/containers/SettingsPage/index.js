/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SettingsForm from 'components/SettingsForm';
import { makeSelectUser } from 'containers/App/selectors';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  callUpdate,
  callLogout,
  waitGetUser,
} from './actions';

export class SettingsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      user,
      actCallUpdate,
      actCallLogout,
      settingspage,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>SettingsPage</title>
          <meta name="description" content="Description of SettingsPage" />
        </Helmet>
        <SettingsForm
          user={user}
          listError={settingspage.listError}
          callLogout={actCallLogout}
          callUpdate={actCallUpdate}
        />
      </div>
    );
  }
}

SettingsPage.propTypes = {
  settingspage: PropTypes.object,
  user: PropTypes.object,
  actCallUpdate: PropTypes.func,
  actCallLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  settingspage: makeSelectSettingsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    actCallUpdate: (options) => dispatch(callUpdate(options)),
    actCallLogout: () => dispatch(callLogout()),
    actWaitGetUser: () => dispatch(waitGetUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'settingsPage', reducer });
const withSaga = injectSaga({ key: 'settingsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SettingsPage);
