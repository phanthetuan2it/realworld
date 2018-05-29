import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { checkErrorImage } from 'utils/helpers';
import Tags from 'components/Tags';
import ArticleWrapper from './ArticleWrapper';
function Article(props) {
  const {
    article,
    setFavorite,
    // slug,
  } = props;
  const linkAuthor = article ? `/@${article.author.username}` : '';
  return (
    props.children
    ?
      <ArticleWrapper className="article-preview">
        {props.children}
      </ArticleWrapper>
    :
      <ArticleWrapper className="article-preview">
        <div className="article-meta">
          <Link to={linkAuthor}>
            <img src={article.author.image} onError={checkErrorImage} alt="img-author" />
          </Link>
          <div className="info">
            <Link to={linkAuthor} className="author">
              {article.author.username}
            </Link>
            <span className="date">{article.createdAt}</span>
          </div>
          <div className="pull-xs-right">
            <button
              className={`btn btn-sm ${article.favorited ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFavorite(article)}
            >
              {article.favorited}
              <i className="ion-heart"></i>
              <span>{article.favoritesCount}</span>
            </button>
          </div>
        </div>
        <Link to={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <Tags
            tags={article.tagList}
            tagType="outline"
          />
        </Link>
      </ArticleWrapper>
  );
}

Article.propTypes = {
  article: PropTypes.object,
  setFavorite: PropTypes.func,
  // slug: PropTypes.string,
  children: PropTypes.object,
};

export default Article;
