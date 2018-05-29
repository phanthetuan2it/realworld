import React from 'react';
import PropTypes from 'prop-types';

function IconLoading({ label }) {
  return (
    <div>{label}</div>
  );
}

IconLoading.propTypes = {
  label: PropTypes.string,
};

export default IconLoading;
