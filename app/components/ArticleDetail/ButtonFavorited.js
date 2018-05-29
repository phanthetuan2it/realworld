import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonFavorited(props) {
  const {
    article,
    onClick,
    user,
    callDeleteArticle,
  } = props;

  if (user && article.author && user.username !== article.author.username) {
    return (
      <button
        onClick={onClick}
        className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
      >
        <i className="ion-heart"></i>
        &nbsp;
        {article.favorited ? 'Unfavorite' : 'Favorite'} Post
        <span className="counter">
          {article.favoritesCount ? `(${article.favoritesCount})` : ''}
        </span>
      </button>
    );
  }

  if (user && article.author && user.username === article.author.username) {
    return (
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={callDeleteArticle}
      >
        <i className="ion-trash-a"></i> Delete Article
      </button>
    );
  }

  return (
    <Link
      to="/signin"
      className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
    >
      <i className="ion-heart"></i>
      &nbsp;
      {article.favorited ? 'Unfavorite' : 'Favorite'} Post
      <span className="counter">
        {article.favoritesCount ? `(${article.favoritesCount})` : ''}
      </span>
    </Link>
  );
}

ButtonFavorited.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func,
  user: PropTypes.object,
  callDeleteArticle: PropTypes.func,
};

export default ButtonFavorited;
