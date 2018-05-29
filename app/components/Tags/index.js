import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagsWrapper from './TagsWrapper';

function Tags(props) {
  const {
    tags,
    tagType,
    setTag,
    removeTag,
  } = props;

  const arrType = {
    outline: 'tag-outline',
    form: 'form',
  };

  function handleSetTag(e, tag) {
    e.preventDefault();
    setTag(tag);
  }

  function renderTags() {
    if (tagType === 'outline') {
      return renderTagOutLine();
    } else if (tagType === 'form') {
      return renderTagForm();
    }
    return renderTagDefault();
  }

  function renderTagDefault() {
    return tags && tags.map((tag) => (
      <Link
        key={`tag-${tag}`}
        to=""
        onClick={(e) => handleSetTag(e, tag)}
        className="tag-pill tag-default"
      >
        {tag}
      </Link>
    ));
  }

  function renderTagForm() {
    return tags && tags.map((tag, idx) => (
      <li
        key={`${tag}`}
        className="tag-pill tag-default"
      >
        <i role="button" tabIndex="0" className="ion-close-round" onClick={() => removeTag(idx)}></i>
        {tag}
      </li>
    ));
  }

  function renderTagOutLine() {
    return tags && tags.map((tag) => (
      <li
        key={`${tag}`}
        className={`tag-pill tag-default ${arrType[tagType]}`}
      >
        {tag}
      </li>
    ));
  }

  return (
    <TagsWrapper className="tag-list">
      {renderTags()}
    </TagsWrapper>
  );
}

Tags.propTypes = {
  tags: PropTypes.array,
  tagType: PropTypes.string,
  setTag: PropTypes.func,
  removeTag: PropTypes.func,
};

export default Tags;
