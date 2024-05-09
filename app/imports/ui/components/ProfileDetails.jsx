import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfileDetails = ({ person }) => (
  <tr>
    <td>{person.contactEmail}</td>
    <td>{person.firstName}</td>
    <td>{person.lastName}</td>
    <td>{person.bio}</td>
    <td>{person.title}</td>
    <td>{person.interest}</td>
    <td>
      <Link to={`/edit/${person._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
ProfileDetails.propTypes = {
  person: PropTypes.shape({
    contactEmail: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    title: PropTypes.string,
    interest: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default ProfileDetails;
