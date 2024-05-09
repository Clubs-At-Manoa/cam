import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import ProfileDetails from '../components/ProfileDetails';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const DisplayProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profile documents
    // eslint-disable-next-line no-shadow
    const profileDetails = Profiles.collection.find({}).fetch();
    return {
      profiles: profileDetails,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Stuff</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Contact email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Bio</th>
                <th>Title</th>
                <th>interest</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((person) => <ProfileDetails key={person._id} person={person} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default DisplayProfile;
