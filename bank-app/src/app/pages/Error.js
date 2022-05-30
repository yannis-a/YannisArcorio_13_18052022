import React from "react";
import PropTypes from "prop-types";

/**
 * page make up the error of the app
 *
 * Call from {@link App}
 *
 * @param {string} title title of the error
 * @param {string} content description of the error
 * @component
 */
const Error = ({ title, content }) => {
  return (
    <div className="error">
      <div>
        <h1>{title}</h1>
      </div>
      <span>{content}</span>
    </div>
  );
};

Error.propTypes = {
  /**
   * title of the error
   */
  title: PropTypes.string.isRequired,
  /**
   * description of the error
   */
  content: PropTypes.string.isRequired,
};

export default Error;