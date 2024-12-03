import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" id="app-navbar">
      <Container>
        <Navbar.Brand href="/" id="logo-name">BuggyThoughts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          <Nav.Link as={Link} to="/" className="navbar-collapse">Home</Nav.Link>

          {!user.isAdmin && (
            <Nav.Link href="/posts" className="navbar-collapse">Posts</Nav.Link>
          )}

          {user && user.isAdmin === true && (
            <Nav.Link href="/posts" className="navbar-collapse">Dashboard</Nav.Link>
          )}

          {user && user.id !== null ? (
            <Nav.Link href="/logout" className="navbar-collapse">Logout</Nav.Link>
          ) : (
            <>
              <Nav.Link href="/login" className="navbar-collapse">Login</Nav.Link>
              <Nav.Link href="/register" className="navbar-collapse">Register</Nav.Link>
            </>
          )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

