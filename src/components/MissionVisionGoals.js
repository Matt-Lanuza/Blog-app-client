import { Container, Carousel } from 'react-bootstrap';

export default function MissionVisionGoalsCarousel() {
  return (
    <Container className="my-5">
      {/* Title Section */}
      <div className="text-center mb-4">
        <h2 className="display-7 text-primary">Our Mission, Vision, and Goals</h2>
        <p className="lead text-muted">
          Empowering developers, fostering community, and continuous growth.
        </p>
      </div>

      {/* Carousel Section */}
      <Carousel>
        {/* Mission Slide */}
        <Carousel.Item>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#f4f8fa',
              borderRadius: '12px',
              padding: '40px',
              minHeight: '250px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="text-center">
              <h3 className="text-primary mb-3">Our Mission</h3>
              <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                We empower developers by providing a platform to share knowledge, solve problems,
                and grow together. BuggyThoughts is a space where developers thrive by learning,
                sharing, and connecting.
              </p>
            </div>
          </div>
        </Carousel.Item>

        {/* Vision Slide */}
        <Carousel.Item>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#f4f8fa',
              borderRadius: '12px',
              padding: '40px',
              minHeight: '250px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="text-center">
              <h3 className="text-success mb-3">Our Vision</h3>
              <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                To be the go-to blog for developers, fostering a community that supports continuous
                learning and innovation. Our vision is to shape the future of programming, one post
                at a time.
              </p>
            </div>
          </div>
        </Carousel.Item>

        {/* Goals Slide */}
        <Carousel.Item>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: '#f4f8fa',
              borderRadius: '12px',
              padding: '40px',
              minHeight: '250px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="text-center">
              <h3 className="text-warning mb-3">Our Goals</h3>
              <ul className="list-unstyled text-secondary" style={{ fontSize: '1rem' }}>
                <li>📌 Publish insightful, beginner-friendly content that everyone can understand.</li>
                <li>📌 Foster an active community of developers through discussions and collaborations.</li>
                <li>📌 Continuously enhance the platform for a seamless experience, integrating new tools and features.</li>
              </ul>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
