import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import { times } from 'lodash';
import PaginationWrapper from './PaginationWrapper';

// function isActive(search) {
//   return function(_, location) {
//     return search === location.search || (search === '?page=1' && location.search === '');
//   }
// }

function Pagination(props) {
  const {
    paging,
    setPage,
    // match,
    curPage,
  } = props;

  function handleSetPage(e, page) {
    e.preventDefault();
    setPage(page);
  }

  return (
    <PaginationWrapper className="pagination">
      {(paging !== undefined && paging !== 1) && times(paging <= 50 ? paging : 50, Number).map((item) => (
        <li key={item} className="page-item">
          <a
            href=""
            className={`page-link ${curPage === item ? 'active' : ''}`}
            onClick={(e) => handleSetPage(e, item)}
          >
            {item + 1}
          </a>
          {/* paging has link
          <NavLink
            to={{
              pathname: match.url,
              search: `?page=${item+1}`,
            }}
            className="page-link"
            activeClassName="active"
            isActive={isActive(`?page=${item+1}`)}
          >
            {item + 1}
          </NavLink> */}
        </li>
      ))}
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  paging: PropTypes.number,
  setPage: PropTypes.func,
  // match: PropTypes.object,
  curPage: PropTypes.number,
};

export default Pagination;
