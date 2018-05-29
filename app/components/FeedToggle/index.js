import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import FeedToggleWrapper from './FeedToggleWrapper';
import ItemFeed from './ItemFeed';

class FeedToggle extends React.Component {
  renderListTab = () => {
    const {
      // tag,
      curTab,
      setTab,
      // isLoging,
      listTab,
      typeListTab,
    } = this.props;
    if (typeListTab === 'navLink') {
      return listTab && listTab.map((item) => (
        <li
          key={item.label}
          className="nav-item"
        >
          <NavLink
            to={item.href}
            className="nav-link"
            exact
          >
            {item.label}
          </NavLink>
        </li>
      ));
    }
    return listTab && listTab.map((item) => (
      <ItemFeed
        key={item.label}
        label={item.label}
        href={item.href ? item.href : ''}
        className={`${curTab === item.tab ? 'active' : ''}`}
        tab={item.tab}
        type={item.type ? item.type : ''}
        setTab={setTab}
      />
    ));
  }
  render() {
    return (
      <div>
        <FeedToggleWrapper className="nav nav-pills">
          {this.renderListTab()}
        </FeedToggleWrapper>
      </div>
    );
  }
}

FeedToggle.propTypes = {
  // tag: PropTypes.string,
  curTab: PropTypes.string,
  setTab: PropTypes.func,
  // isLoging: PropTypes.bool,
  listTab: PropTypes.array,
  typeListTab: PropTypes.string,
};

export default FeedToggle;
