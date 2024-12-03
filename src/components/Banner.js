import { Button, Row, Col } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function Banner() {

  return (
    <Row>
      <Col className="text-center py-5">
        <h1>Welcome to BuggyThoughts</h1>
         <p>Debugging life and code, one thought at a time. Join us for insights, tips, and tools to elevate your coding journey!</p>
        <Button variant="danger">
          Explore Insights
        </Button>
      </Col>
    </Row>
  );
}
