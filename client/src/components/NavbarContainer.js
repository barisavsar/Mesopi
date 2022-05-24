import React, { Component } from 'react'
import axios from 'axios';
import {Navbar, Nav, NavDropdown,Form,FormControl,Button, Container} from  'react-bootstrap'

const logout = () => {
  localStorage.removeItem("user");
};

const NavbarContainer = () => {
  const isLoggedIn = localStorage.getItem('user');

    return (
        <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand href="#">Mesopi - Medical Second Opinion</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/AboutUs">About Us</Nav.Link>
        {!isLoggedIn && (
          <NavDropdown title="Sign Up" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/signup/patient">Patients</NavDropdown.Item>
            <NavDropdown.Item href="/signup/doctor">Doctor</NavDropdown.Item>          
          </NavDropdown>
        )}
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      {isLoggedIn && <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>}
    </Navbar.Collapse>
  </Container>
</Navbar>
      
    )
    
  }

  export default NavbarContainer ;