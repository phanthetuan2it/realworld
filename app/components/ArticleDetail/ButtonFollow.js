import React from 'react';
import PropTypes from 'prop-types';
import { textDefault } from 'constants/index';
import { Link } from 'react-router-dom';

function ButtonFollow(props) {
  const {
    article,
    onClick,
    user,
  } = props;

  if (user && article.author && user.username !== article.author.username) {
    return (
      <button
        onClick={onClick}
        className={`btn btn-sm ${article.author && article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}`}
      >
        <i className="ion-plus-round"></i>
        &nbsp;
        {article.author && article.author.following ? 'Unfollow' : 'Follow'} {article.author ? article.author.username : textDefault}
        {/* <span className="counter">(10)</span> */}
      </button>
    );
  }

  if (user && article.author && user.username === article.author.username) {
    return (
      <Link
        to={`/editor/${article.slug}`}
        className="btn btn-outline-secondary btn-sm"
      >
        <i className="ion-edit"></i> Edit Article
      </Link>
    );
  }

  return (
    <Link
      to="/signin"
      className={`btn btn-sm ${article.author && article.author.following ? 'btn-secondary' : 'btn-outline-secondary'}`}
    >
      <i className="ion-plus-round"></i>
      &nbsp;
      {article.author && article.author.following ? 'Unfollow' : 'Follow'} {article.author ? article.author.username : textDefault}
      {/* <span className="counter">(10)</span> */}
    </Link>
  );
}

ButtonFollow.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func,
  user: PropTypes.object,
};

export default ButtonFollow;
