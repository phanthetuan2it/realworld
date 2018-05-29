/**
 *
 * Editor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { compose } from 'redux';
import ArticleTemplate from 'components/Articles/ArticleTemplate';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
// import reducerHomePage from 'containers/HomePage/reducer';
// import sagaHomePage from 'containers/HomePage/saga';
import { makeSelectUser } from 'containers/App/selectors';
import makeSelectEditor from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  postArticle,
  getArticle,
  resetArticle,
  addTag,
  // removeTag,
} from './actions';

export class Editor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { match, actGetArticle } = this.props;
    const slug = match.params.slug;
    if (slug) {
      actGetArticle(slug);
    }
  }

  componentWillUnmount() {
    this.props.actResetArticle();
  }

  render() {
    const {
      editor,
      actPostArticle,
      actAddTag,
      user,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Editor</title>
          <meta name="description" content="Description of Editor" />
        </Helmet>
        <ArticleTemplate
          postArticle={actPostArticle}
          addTag={actAddTag}
          user={user}
          {...editor}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  editor: PropTypes.object,
  user: PropTypes.object,
  actPostArticle: PropTypes.func,
  actAddTag: PropTypes.func,
  // actRemoveTag: PropTypes.func,
  actGetArticle: PropTypes.func,
  actResetArticle: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  editor: makeSelectEditor(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    actPostArticle: (data) => dispatch(postArticle(data)),
    actAddTag: (tag) => dispatch(addTag(tag)),
    // actRemoveTag: (article) => dispatch(removeTag(article)),
    actGetArticle: (slug) => dispatch(getArticle(slug)),
    actResetArticle: () => dispatch(resetArticle()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editor', reducer });
const withSaga = injectSaga({ key: 'editor', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Editor);
