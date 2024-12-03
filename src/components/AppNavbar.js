import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function AppNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="app-navbar">
      <Container>
        <Navbar.Brand href="#home" id="logo-name">BuggyThoughts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="navbar-collapse">Home</Nav.Link>
            <Nav.Link href="#link" className="navbar-collapse">Login</Nav.Link>
            <Nav.Link href="#link" className="navbar-collapse">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

