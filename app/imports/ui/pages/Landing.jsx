import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PeopleFill, CardText, Link } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={12} className="d-flex flex-column justify-content-center">
        <h1>Welcome to Clubs At Manoa</h1>
        <p>Organizations and interest of U.H.M students</p>
        <p>Start by Making a profile and select your interest or loggin in to an existing account</p>
      </Col>
      <Col xs={12}>
        <Image src="/images/Manoa_4.jpg" width="800px" />
      </Col>
    </Row>
    <br />
    <Row className="align-middle text-center">
      <Col xs={4}>
        <CardText size={75} />
        <h5>Applications and Forms</h5>
        <p>RIO Applications for the 2023-24 academic year are now available </p>
      </Col>
      <Col xs={4}>
        <PeopleFill size={75} />
        <h5>Registered Independent Organizations</h5>
        <p>Student organizations, associations, or clubs that are formed to meet special interests of certain groups of students on campus</p>
      </Col>
      <Col xs={4}>
        <Link size={75} />
        <h5>Helpful Links</h5>
        <p> </p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
