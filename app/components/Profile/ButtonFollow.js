import React from 'react';
import PropTypes from 'prop-types';
import { textDefault } from 'constants/index';
import { Link } from 'react-router-dom';

function ButtonFollow(props) {
  const {
    profile,
    onClick,
    user,
  } = props;

  if (user.username !== undefined && profile && user.username !== profile.username) {
    return (
      <button
        onClick={onClick}
        className={`btn btn-sm ${profile && profile.following ? 'btn-secondary' : 'btn-outline-secondary'} action-btn`}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {profile && profile.following ? 'Unfollow' : 'Follow'} {profile ? profile.username : textDefault}
        {/* <span className="counter">(10)</span> */}
      </button>
    );
  }

  if (user && profile && user.username === profile.username) {
    return (
      <Link
        to="/settings"
        className="btn btn-outline-secondary btn-sm action-btn"
      >
        <i className="ion-edit"></i> Edit profile
      </Link>
    );
  }

  return (
    <Link
      to="/signin"
      className={`btn btn-sm ${profile && profile.following ? 'btn-secondary' : 'btn-outline-secondary'} action-btn`}
    >
      <i className="ion-plus-round"></i>
      &nbsp;
      {profile && profile.following ? 'Unfollow' : 'Follow'} {profile ? profile.username : textDefault}
      {/* <span className="counter">(10)</span> */}
    </Link>
  );
}

ButtonFollow.propTypes = {
  onClick: PropTypes.func,
  profile: PropTypes.object,
  user: PropTypes.object,
};

export default ButtonFollow;
