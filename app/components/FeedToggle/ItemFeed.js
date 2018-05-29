import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
function ItemFeed(props) {
  const {
    className,
    tab,
    label,
    href,
    setTab,
    type,
  } = props;

  function handleClick(e, valTab) {
    e.preventDefault();
    if (type === 'link') {
      const history = createBrowserHistory({});
      history.push(`/${href}`);
    }
    setTab(valTab);
  }

  return (
    <li className="nav-item">
      <a
        href={href}
        className={`${className} nav-link`}
        onClick={(e) => handleClick(e, tab)}
      >
        {label}
      </a>
    </li>
  );
}

ItemFeed.propTypes = {
  className: PropTypes.string,
  tab: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
  setTab: PropTypes.func,
  type: PropTypes.string,
};

export default ItemFeed;
