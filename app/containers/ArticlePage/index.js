/**
 *
 * ArticlePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ArticleDetail from 'components/ArticleDetail';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticlePage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  getArticle,
  callFollow,
  callFavorited,
  callPostComment,
  callDeleteComment,
  callDeleteArticle,
} from './actions';

export class ArticlePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount = () => {
    this.props.actGetArticle(this.props.match.params.slug);
  }

  render() {
    const {
      articlepage,
      actCallFollow,
      actCallFavorited,
      actCallPostComment,
      actCallDeleteComment,
      actCallDeleteArticle,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>ArticlePage</title>
          <meta name="description" content="Description of ArticlePage" />
        </Helmet>
        <ArticleDetail
          callFollow={actCallFollow}
          callFavorited={actCallFavorited}
          callPostComment={actCallPostComment}
          callDeleteComment={actCallDeleteComment}
          callDeleteArticle={actCallDeleteArticle}
          {...articlepage}
        />
      </div>
    );
  }
}

ArticlePage.propTypes = {
  match: PropTypes.object,
  articlepage: PropTypes.object,
  actGetArticle: PropTypes.func,
  actCallFollow: PropTypes.func,
  actCallFavorited: PropTypes.func,
  actCallPostComment: PropTypes.func,
  actCallDeleteComment: PropTypes.func,
  actCallDeleteArticle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  articlepage: makeSelectArticlePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    actGetArticle: (slug) => dispatch(getArticle(slug)),
    actCallFollow: (username) => dispatch(callFollow(username)),
    actCallFavorited: (slug) => dispatch(callFavorited(slug)),
    actCallPostComment: (comment) => dispatch(callPostComment(comment)),
    actCallDeleteComment: (id) => dispatch(callDeleteComment(id)),
    actCallDeleteArticle: () => dispatch(callDeleteArticle()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articlePage', reducer });
const withSaga = injectSaga({ key: 'articlePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
