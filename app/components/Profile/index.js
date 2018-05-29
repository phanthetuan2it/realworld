/**
*
* Profile
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Articles from 'components/Articles';
import { checkErrorImage } from 'utils/helpers';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import ProfileWrapper from './ProfileWrapper';
import ButtonFollow from './ButtonFollow';
class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-functio

  render() {
    const {
      profile,
      homePage,
      setPage,
      setTab,
      setFavorite,
      callFollow,
      listTab,
      user,
    } = this.props;

    return (
      <ProfileWrapper className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} onError={checkErrorImage} alt="user-img" className="user-img" />
                <h4>{profile.username}</h4>
                <p>
                  {profile.bio}
                </p>
                <ButtonFollow
                  user={user}
                  profile={profile}
                  onClick={() => callFollow(profile.username)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Articles
                setPage={setPage}
                setTab={setTab}
                setFavorite={setFavorite}
                listTab={listTab}
                typeListTab="navLink"
                {...homePage}
              />
            </div>
          </div>
        </div>
      </ProfileWrapper>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  homePage: PropTypes.object,
  setPage: PropTypes.func,
  setTab: PropTypes.func,
  setFavorite: PropTypes.func,
  callFollow: PropTypes.func,
  listTab: PropTypes.array,
};

export default Profile;
