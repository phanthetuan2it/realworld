import React from 'react';
import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import FeedToggle from 'components/FeedToggle';
import IconLoading from 'components/common/IconLoading';
import Article from './Article';
import Pagination from './Pagination';
import ArticlesWrapper from './ArticlesWrapper';

function Articles(props) {
  const {
    articles,
    paging,
    setPage,
    curPage,
    setTab,
    curTab,
    setFavorite,
    tag,
    listTab,
    typeListTab,
    isLoading,
  } = props;

  const renderArticles = () => {
    if (isLoading && isLoading.articles) {
      return (
        <Article>
          <IconLoading label="Loading articles" />
        </Article>
      );
    } else if (articles && !articles.length) {
      return (
        <Article>
          <IconLoading label="No articles" />
        </Article>
      );
    }
    return (articles && articles.map((item) => (
      <Article
        key={item.slug}
        article={item}
        setFavorite={setFavorite}
      />
    )));
  };

  return (
    <ArticlesWrapper>
      <FeedToggle
        setTab={setTab}
        curTab={curTab}
        tag={tag}
        listTab={listTab}
        typeListTab={typeListTab}
      />
      {renderArticles()}
      <Pagination
        paging={paging}
        setPage={setPage}
        curPage={curPage}
        {...props}
      />
      {/* <Route
        path="/"
        render={(props) => {
          return <Pagination
          paging={paging}
          setPage={setPage}
          {...props}
        />
      } }
      />*/}
    </ArticlesWrapper>
  );
}

Articles.propTypes = {
  articles: PropTypes.array,
  paging: PropTypes.number,
  setPage: PropTypes.func,
  curPage: PropTypes.number,
  setTab: PropTypes.func,
  curTab: PropTypes.string,
  setFavorite: PropTypes.func,
  tag: PropTypes.string,
  listTab: PropTypes.array,
  typeListTab: PropTypes.string,
  isLoading: PropTypes.object,
};

export default Articles;
