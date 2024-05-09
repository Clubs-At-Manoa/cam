import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        University of Hawaii at Manoa
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        Phone: (808) 956-8178
        Email: sld@hawaii.edu
        <br />
        @2023 University of Hawaii
      </Col>
    </Container>
  </footer>
);

export default Footer;
