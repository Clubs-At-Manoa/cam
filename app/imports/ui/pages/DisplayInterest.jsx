import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Interests } from '../../api/interests/Interests';
import InterestDetails from '../components/InterestDetails';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const DisplayInterest = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, interests } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Interests.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profile documents
    // eslint-disable-next-line no-shadow
    const InterestDetails = Interests.collection.find({}).fetch();
    return {
      interests: InterestDetails,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Interests</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {interests.map((desc) => <InterestDetails key={desc._id} desc={desc} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default DisplayInterest;
