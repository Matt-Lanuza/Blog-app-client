import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Container } from 'react-bootstrap';
import GetComments from '../components/GetComments';
import AddComment from '../components/AddComment';

export default function PostDetailsPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = () => {
    fetch(`https://blog-post-server.onrender.com/posts/getComments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.comments) {
          setComments(data.comments);
        }
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };

  useEffect(() => {
    // Fetch the post by ID
    fetch(`https://blog-post-server.onrender.com/posts/getPost/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load post details. Please try again later.');
        setLoading(false);
      });

    // Fetch comments
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
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
      <Card className="shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
        <Card.Body className="my-5">
          {/* Title */}
          <Card.Title className="display-4 font-weight-bold mb-3 text-center">
            {post.title}
          </Card.Title>

          {/* Author and Date */}
          <Card.Subtitle className="text-muted mb-5 text-center">
            By: {post.author} -{' '}
            <small>{new Date(post.creationDate).toLocaleString()}</small>
          </Card.Subtitle>

          {/* Post Content */}
          <Card.Text className="text-justify">{post.content}</Card.Text>
        </Card.Body>
        <h4 className="comments-title mb-4 text-center">Comments</h4>
        
        <GetComments comments={comments} />
        <AddComment postId={id} refreshComments={fetchComments} />
      </Card>

      <div className="text-center mt-3">
        <p>
          <a href="/posts">Back to Blog Posts</a>
        </p>
      </div>
    </Container>
  );
}
