import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Club = ({ club }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={club.image} width={75} />
      <Card.Title>{club.clubName}</Card.Title>
      <Card.Subtitle>{club.clubType} <br /> {club.contact}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{club.purpose}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Club.propTypes = {
  club: PropTypes.shape({
    clubName: PropTypes.string,
    dateApproved: PropTypes.string,
    dateExpired: PropTypes.string,
    clubType: PropTypes.string,
    contact: PropTypes.string,
    purpose: PropTypes.string,
    image: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

export default Club;
