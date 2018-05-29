/**
 *
 * ProfileFavorites
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  ProfilePage,
  mapDispatchToProps,
  mapStateToProps,
} from 'containers/ProfilePage';

import reducer from 'containers/ProfilePage/reducer';
import saga from 'containers/ProfilePage/saga';
import reducerHomePage from 'containers/HomePage/reducer';
import sagaHomePage from 'containers/HomePage/saga';

class ProfileFavorites extends ProfilePage { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const username = this.props.match.params.username;
    this.props.getDataProfile(username);
    this.props.setDataTab('favorites', username);
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

const withReducerHomePage = injectReducer({ key: 'homePage', reducer: reducerHomePage });
const withSagaHomePage = injectSaga({ key: 'homePage', saga: sagaHomePage });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withReducerHomePage,
  withSagaHomePage,
)(ProfileFavorites);
