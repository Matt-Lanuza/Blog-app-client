import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary sticky-top" id="app-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" id="logo-name">BuggyThoughts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">

            <Nav.Link as={Link} to="/" className="navbar-collapse">Home</Nav.Link>

            {!user.isAdmin && (
              <>
                <Nav.Link as={Link} to="/posts" className="navbar-collapse">Posts</Nav.Link>
                <Nav.Link as={Link} to="/my-posts" className="navbar-collapse">{user.username}</Nav.Link>
              </>
            )}

            {user && user.isAdmin === true && (
              <Nav.Link as={Link} to="/posts" className="navbar-collapse">Dashboard</Nav.Link>
            )}

            {user && user.id !== null ? (
              <Nav.Link as={Link} to="/logout" className="navbar-collapse">Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="navbar-collapse">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="navbar-collapse">Register</Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
