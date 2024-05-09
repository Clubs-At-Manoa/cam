import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/logo.png" width="150px" />
      </Col>
      <Col xs={4} className="d-flex flex-column justify-content-center">
        <h1>Welcome to Clubs at Manoa</h1>
        <p>Lets get started!</p>
        <p>The University of Hawaiis Board of Regents BOR acknowledges through Chapter 7 of its policies that robust student life programs should foster critical thinking, problem-solving, decision-making, and leadership skill development </p>
        <p>to prepare students to become informed, responsible citizens who engage in and continue to make contributions for the betterment of humanity and the improvement of our communities RP 7.201.</p>
      </Col>
    </Row>
  </Container>
);

export default Home;
