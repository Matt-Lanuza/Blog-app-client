import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Container } from 'react-bootstrap';

export default function UserView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the posts from the backend API
    fetch('https://blog-post-server.onrender.com/posts/getAllPosts')
      .then((res) => res.json())
      .then((data) => {
        console.log("Posts Data", data);
        setPosts(data.posts); // Set posts if the API call is successful
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <Container className="my-5">
      {posts.map((post) => (
        <Card key={post._id} className="my-4 shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
          <Card.Body>
            {/* Title */}
            <Card.Title className="display-4 font-weight-bold">{post.title}</Card.Title>

            {/* Author and Date */}
            <Card.Subtitle className="text-muted mb-2">By: {post.author} - <small>{new Date(post.creationDate).toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}</small>
            </Card.Subtitle>

            {/* Post Content */}
            <Card.Text className="text-justify">
              {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
            </Card.Text>

            {/* "Read More" Button */}
            <Button variant="outline-primary" size="sm">Read More</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
