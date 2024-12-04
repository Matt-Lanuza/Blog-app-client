import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="mb-0">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="mb-0">
              <strong>Location:</strong> 123 BuggyThoughts Street, Tech City, 12345
            </p>
            <p className="mb-0">
              <strong>Email:</strong> contact@buggythoughts.com
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
