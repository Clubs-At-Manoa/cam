import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col med={4}>
        <Image src="/images/1.jpg" width="150px" />
        <Image src="/images/2.jpg" width="150px" />
        <Image src="/images/3.jpg" width="150px" />
        <Image src="/images/4.jpg" width="150px" />
        <Image src="/images/5.jpg" width="150px" />
      </Col>
    </Row>
    <Row>
      <Col med={4} className="d-flex flex-column justify-content-center text-center">
        <h1>Welcome to Clubs at Manoa</h1>
        <h2>Lets get started!</h2>
        <br />
        {/* eslint-disable-next-line max-len */}
        <p>The University of Hawaiis Board of Regents BOR acknowledges through Chapter 7 of its policies that robust student life programs should foster critical thinking, problem-solving, decision-making, and leadership skill development to prepare students to become informed, responsible citizens who engage in and continue to make contributions for the betterment of humanity and the improvement of our communities RP 7.201.</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <Image src="/images/6.png" width="280px" />
      </Col>
      <Col>
        <Image src="/images/7.png" width="305px" />
      </Col>
      <Col med={4} className="d-flex flex-column justify-content-center text-center">
        <h4>SLD Office Hours:</h4>
        <p>Monday through Friday : 8am-4:30pm</p>
        <p>Except State Holidays</p>
      </Col>
    </Row>
  </Container>
);

export default Home;
