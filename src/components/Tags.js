/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags, addTag, removeTag }) => {
  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div key={index} className="tag">
          <span>{tag}</span>
          <i className="fas fa-times" onClick={() => removeTag(index)}></i>
        </div>
      ))}
      <input
        type="text"
        placeholder="Type and Press Enter to add a Tag"
        onKeyUp={addTag}
      />
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  addTag: PropTypes.func,
  removeTag: PropTypes.func
};

export default Tags;
