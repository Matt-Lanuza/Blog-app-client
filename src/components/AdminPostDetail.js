import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, ListGroup, Spinner } from 'react-bootstrap';

export default function AdminPostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize the function to avoid unnecessary re-renders
  const fetchPostDetails = useCallback(() => {
    setLoading(true);
    fetch(`https://blog-post-server.onrender.com/posts/getPost/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load post details. Please try again later.');
        setLoading(false);
      });
  }, [postId]); // Dependency on postId

  const fetchPostComments = useCallback(() => {
    fetch(`https://blog-post-server.onrender.com/posts/getComments/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => {
        setError('Failed to load comments. Please try again later.');
      });
  }, [postId]); // Dependency on postId

  useEffect(() => {
    fetchPostDetails();
    fetchPostComments();
  }, [postId, fetchPostDetails, fetchPostComments]); // Dependency on postId, fetchPostDetails, and fetchPostComments

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You are not authorized to delete comments.');
      return;
    }

    fetch(`https://blog-post-server.onrender.com/posts/adminDeleteComment/${postId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(() => {
        fetchPostComments(); // Refresh comments after deletion
      })
      .catch((err) => {
        setError('Failed to delete comment. Please try again later.');
      });
  };

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

  if (!post) {
    return (
      <div className="alert alert-warning" role="alert">
        Post not found.
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={() => navigate(-1)}>Back to Admin Dashboard</Button>
      <h2 className="mt-4">{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date Created:</strong> {new Date(post.creationDate).toLocaleString()}</p>
      <div className="mt-4">
        <h4>Content</h4>
        <p>{post.content}</p>
      </div>
      
      <div className="mt-4">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment._id} className="d-flex justify-content-between">
                <div>
                  <strong>{comment.userName}:</strong> {comment.comment}
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>
    </Container>
  );
}
