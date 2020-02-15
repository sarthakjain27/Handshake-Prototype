import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

class CustomNavBar extends React.Component{
  constructor(props){
    super(props);
    this.onSelectNavHandler = this.onSelectNavHandler.bind(this);
  }

  onSelectNavHandler = e => {
    if(e === 'logOut'){
      localStorage.clear();
      window.location.href='/';
    }
  }

  render(){
    let navBar;
    if(localStorage.getItem('userRole') === 'company') {
      navBar = 
        <Navbar bg="primary" variant="dark" onSelect = {this.onSelectNavHandler}>
          <Navbar.Brand href="/listPostings">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/newJobPost">Post Opening</Nav.Link>
            <Nav.Link href="/companySearchStudents">Search Students</Nav.Link>
            <NavDropdown title="Events" id="nav-dropdown">
              <NavDropdown.Item href="/listEvents">List Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/newEventPost">Create Event</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Profile" id="nav-dropdown">
              <NavDropdown.Item href="/companyProfile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="logOut">LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
    } else {
      navBar = 
        <Navbar bg="primary" variant="dark" onSelect = {this.onSelectNavHandler}>
          <Navbar.Brand href="/viewPostedJobs">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/appliedJobs">Applications</Nav.Link>
            <NavDropdown title="Events" id="basic-nav-dropdown">
              <NavDropdown.Item href="/listEventsStudent">Upcoming Events</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/registeredEvents">Your Events</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/studentSearchStudents">Search Students</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/studentProfile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="logOut">LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
    }
    return(
      <div>
        {navBar}
      </div>
    );
  }
}

export default CustomNavBar;