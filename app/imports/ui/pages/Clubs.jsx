import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Badge, Container, Card, Image, Row, Col, Collapse, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';

/* Component for laying out a Club Card. */
const MakeCard = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <Col>
      <Card className="h-100">
        <Card.Body>
          <Card.Title style={{ marginTop: '0px' }}>{project.name}</Card.Title>
          <Card.Subtitle>{project.clubType}</Card.Subtitle>
          <Card.Text>{project.description}</Card.Text>
          <Card.Text>Approved Date: {project.approvedDate}</Card.Text>
          <Card.Text>Expiration Date: {project.expirationDate}</Card.Text>
          <Card.Text>Manager: {project.clubManager}</Card.Text>
          <Card.Text>Contact: {project.contact}</Card.Text>
          <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} variant="link">
            Show Purpose
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <Card.Text>{project.purpose}</Card.Text>
            </div>
          </Collapse>
          <div>
            Interests: {project.interests?.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
          </div>
          <div>
            Participants: {project.participants?.map((participant, index) => <Image key={index} roundedCircle src={participant} width={50} />)}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

MakeCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    approvedDate: PropTypes.string,
    expirationDate: PropTypes.string,
    clubType: PropTypes.string,
    purpose: PropTypes.string,
    clubManager: PropTypes.string,
    contact: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* Renders the Club Collection as a set of Cards. */
const ClubsPage = () => {
  const { projects, ready } = useTracker(() => {
    const handles = [
      Meteor.subscribe(ProfilesClubs.userPublicationName),
      Meteor.subscribe(Clubs.userPublicationName),
      Meteor.subscribe(ClubsInterests.userPublicationName),
      Meteor.subscribe(Profiles.userPublicationName),
    ];
    console.log('Subscription states:', handles.map(handle => handle.ready())); // Logging the readiness of each subscription
    const projects = Clubs.collection.find().fetch();
    console.log('Fetched projects:', projects); // Log fetched projects
    return {
      projects,
      ready: handles.every(handle => handle.ready()),
    };
  }, []);

  return ready ? (
    <Container id={PageIDs.projectsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {projects.length > 0 ? projects.map((project, index) => <MakeCard key={index} project={project} />) : (
          <div>No clubs found. Please check data and subscriptions.</div> // Improved error message
        )}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubsPage;
