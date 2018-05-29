import React from 'react';
import PropTypes from 'prop-types';
import { convertDate } from 'utils/helpers';

function ArticlePage(props) {
  const {
    article,
    user,
    comments,
  } = props;

  const date = article.createdAt ? convertDate(article.createdAt) : '';
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a href=""><img src={article.author ? article.author.image : '--'} alt="avata-author" /></a>
            <div className="info">
              <a href="" className="author">{article.author ? article.author.username : '--'}</a>
              <span className="date">{date}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              {article.author && article.author.following ? 'Unfollow' : 'Follow'} {article.author ? article.author.username : '--'}
              {/* <span className="counter">(10)</span> */}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              {article.favorited ? 'Unfavorite' : 'Favorite'} Post
              <span className="counter">
                {article.favoritesCount ? `(${article.favoritesCount})` : '--'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-md-12">
            {article.body ? article.body : '--'}
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html"><img src={article.author ? article.author.image : '--'} alt="img-profile" /></a>
            <div className="info">
              <a href="" className="author">{article.author ? article.author.username : '--'}</a>
              <span className="date">{date}</span>
            </div>

            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp;
              {article.author && article.author.following ? 'Unfollow' : 'Follow'} {article.author ? article.author.username : '--'}
              {/* <span className="counter">(10)</span> */}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp;
              {article.favorited ? 'Unfavorite' : 'Favorite'} Post
              <span className="counter">
                {article.favoritesCount ? `(${article.favoritesCount})` : '--'}
              </span>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div className="card-footer">
                <img src={user.image ? user.image : '--'} className="comment-author-img" alt="img-author-comment" />
                <button className="btn btn-sm btn-primary">
                Post Comment
                </button>
              </div>
            </form>
            {comments && comments.map((item) => (
              <div key={item.slug} className="card">
                <div className="card-block">
                  <p className="card-text">{item.body}</p>
                </div>
                <div className="card-footer">
                  <a href="" className="comment-author">
                    <img src={item.author.image} className="comment-author-img" alt="img-author-comment" />
                  </a>
                  &nbsp;
                  <a href="" className="comment-author">{item.author.username}</a>
                  <span className="date-posted">{item.createdAt}</span>
                </div>

                <span className="mod-options">
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ArticlePage.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.array,
};

export default ArticlePage;
