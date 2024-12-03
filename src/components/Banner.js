import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const notyf = new Notyf();

export default function Banner() {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();

  // Check if user is authenticated by looking at the user context
  const isAuthenticated = user && user.id !== null;

  const handleClick = () => {
    if (user.isAdmin) {
      notyf.success(`Welcome, ${user.username}! Navigating to the movies page.`);
      navigate('/posts');
    } else {
      notyf.success(`Welcome, ${user.username}! Navigating to the movies page.`);
      navigate('/posts');
    }
  };

  return (
    <Row>
      <Col className="text-center py-5">
        <h1>Welcome to BuggyThoughts</h1>
         <p>Debugging life and code, one thought at a time. Join us for insights, tips, and tools to elevate your coding journey!</p>

        {isAuthenticated && (
          <Button variant="danger" onClick={handleClick}>
            {user.isAdmin ? 'Check Dashboard' : 'Explore Insights'}
          </Button>
        )}
      </Col>
    </Row>
  );
}
