/**
*
* ArticleDetail
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tags from 'components/Tags';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { convertDate, checkErrorImage } from 'utils/helpers';
import Banner from './Banner';
import ButtonFavorited from './ButtonFavorited';
import ButtonFollow from './ButtonFollow';
import Comments from './Comments';

class ArticleDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      article,
      user,
      comments,
      callFollow,
      callFavorited,
      callPostComment,
      callDeleteComment,
      callDeleteArticle,
    } = this.props;

    const date = article.createdAt ? convertDate(article.createdAt) : '';
    return (
      <div className="article-page">
        <Banner {...this.props} />
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              {article.body ? article.body : '--'}
            </div>
            <div className="col-md-12">
              <Tags
                tags={article.tagList}
                tagType="outline"
              />
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html"><img src={article.author} onError={checkErrorImage} alt="img-profile" /></a>
              <div className="info">
                <a href="" className="author">{article.author ? article.author.username : '--'}</a>
                <span className="date">{date}</span>
              </div>
              <ButtonFollow
                article={article}
                onClick={() => callFollow(article.author.username)}
                user={user}
              />
              &nbsp;
              <ButtonFavorited
                article={article}
                onClick={() => callFavorited(article.slug)}
                callDeleteArticle={callDeleteArticle}
                user={user}
              />
            </div>
          </div>
          <Comments
            article={article}
            comments={comments}
            user={user}
            callPostComment={callPostComment}
            callDeleteComment={callDeleteComment}
          />
        </div>

      </div>
    );
  }
}

ArticleDetail.propTypes = {
  article: PropTypes.object,
  user: PropTypes.object,
  comments: PropTypes.array,
  callFollow: PropTypes.func,
  callFavorited: PropTypes.func,
  callPostComment: PropTypes.func,
  callDeleteComment: PropTypes.func,
  callDeleteArticle: PropTypes.func,
};

export default ArticleDetail;
