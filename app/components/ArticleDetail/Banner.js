import React from 'react';
import PropTypes from 'prop-types';
import { checkErrorImage } from 'utils/helpers';
import { Link } from 'react-router-dom';
import { textDefault } from 'constants/index';
import ButtonFollow from './ButtonFollow';
import ButtonFavorited from './ButtonFavorited';

function Banner(props) {
  const {
    article,
    date,
    callFollow,
    callFavorited,
    user,
    callDeleteArticle,
  } = props;
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title ? article.title : textDefault}</h1>
        <div className="article-meta">
          <Link to="">
            <img src={article.author} onError={checkErrorImage} alt="img-article" />
          </Link>
          <div className="info">
            <Link to="" className="author">{article.author ? article.author.username : textDefault}</Link>
            <span className="date">{date}</span>
          </div>
          <ButtonFollow
            article={article}
            onClick={() => callFollow(article.author.username)}
            user={user}
          />
          &nbsp;&nbsp;
          <ButtonFavorited
            article={article}
            onClick={() => callFavorited(article.slug)}
            user={user}
            callDeleteArticle={callDeleteArticle}
          />
        </div>

      </div>
    </div>
  );
}

Banner.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object,
  date: PropTypes.string,
  callFollow: PropTypes.func,
  callFavorited: PropTypes.func,
  callDeleteArticle: PropTypes.func,
};

export default Banner;
