import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown,Form,FormControl,Button, Container} from  'react-bootstrap'


const NavbarContainer = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand href="#">Mesopi - Online Doctor</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/AboutUs">About Us</Nav.Link>
        <NavDropdown title="Login" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/LoginPatients">Patients</NavDropdown.Item>
          <NavDropdown.Item href="/LoginDoctors">Doctors</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/LoginContact">
            Contact
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Sign Up" id="navbarScrollingDropdown">
          <NavDropdown.Item href="/SignUpPatients">Patients</NavDropdown.Item>
          <NavDropdown.Item href="/SignUpDoctors">Doctors</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/SignUpContact">
            Contact
          </NavDropdown.Item>
        </NavDropdown>
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
    </Navbar.Collapse>
  </Container>
</Navbar>
      
    )
    
  }

  export default NavbarContainer ;