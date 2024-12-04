import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

export default function MissionVisionGoals() {
  return (
    <Container className="my-3">

      {/* Mission, Vision, and Goals Card */}
      <Row className="mt-4">
        <Col md={4} className="d-flex">
          <Card className="shadow-sm mb-4 flex-fill">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title className="text-primary">Our Mission</Card.Title>
              <Card.Text>
                We empower developers by providing a platform to share knowledge, solve problems, and grow together. BuggyThoughts is a space where developers thrive by learning, sharing, and connecting.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex">
          <Card className="shadow-sm mb-4 flex-fill">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title className="text-success">Our Vision</Card.Title>
              <Card.Text>
                To be the go-to blog for developers, fostering a community that supports continuous learning and innovation. Our vision is to shape the future of programming, one post at a time.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex">
          <Card className="shadow-sm mb-4 flex-fill">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title className="text-warning">Our Goals</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Publish insightful, beginner-friendly content that everyone can understand.</ListGroup.Item>
                <ListGroup.Item>Foster an active community of developers through discussions and collaborations.</ListGroup.Item>
                <ListGroup.Item>Continuously enhance the platform for a seamless experience, integrating new tools and features.</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
