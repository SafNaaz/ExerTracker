import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

export default class Navigation extends Component {
    render() {
        return (
            
           <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">ExerTracker</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Exercises</Nav.Link>
      <Nav.Link href="/create">Create Exercise Log</Nav.Link>
      <Nav.Link href="/user">Create User</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        );
    }
}
