import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Image, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-dark' : 'bg-light';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container className="align-items-center">
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} /> C.A.M</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="homepage" as={NavLink} to="/home" key="home">Home</Nav.Link>,
              <Nav.Link id="profiles" as={NavLink} to="/profiles" key="profiles">Profiles</Nav.Link>,
            ]) : ''}
            <Nav.Link id="list-clubs-nav" as={NavLink} to="/list" key="list">Clubs</Nav.Link>
            <Nav.Link id="interests" as={NavLink} to="/interests" key="interests">Interests</Nav.Link>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="list-clubs-admin-nav" as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
              <Nav.Link id="add-clubs-nav" as={NavLink} to="/add" key="add">Add Club</Nav.Link>,
              <Nav.Link id="edit-clubs-nav" as={NavLink} to="/edit" key="edit">Edit Club</Nav.Link>,
              <Nav.Link id="edit-profiles-nav" as={NavLink} to="/edit" key="edit">Edit Profiles</Nav.Link>,
              <Nav.Link id="edit-profiles-nav" as={NavLink} to="/edit" key="edit">Edit Profiles</Nav.Link>
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'clubManager') ? ([
              <Nav.Link id="add-clubs-nav" as={NavLink} to="/add" key="add">Add Club</Nav.Link>,
              <Nav.Link id="edit-clubs-nav" as={NavLink} to="/edit" key="edit">Edit Club</Nav.Link>,
              <Nav.Link id="profiles" as={NavLink} to="/profiles" key="profiles">Profiles</Nav.Link>
            ]) : ''}
            
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
