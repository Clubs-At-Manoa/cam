import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const InterestDetails = ({ desc }) => (
  <tr>
    <td>{desc.interest}</td>
    <td>
      <Link to={`/edit/${desc._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
InterestDetails.propTypes = {
  desc: PropTypes.shape({
    interest: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default InterestDetails;
