import { useState, useEffect } from 'react';
import { Card, Spinner, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UserView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token') !== null;
  console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    fetch('https://blog-post-server.onrender.com/posts/getAllPosts')
      .then((res) => res.json())
      .then((data) => {
        console.log('Posts Data', data);
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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

  return (
    <Container className="my-5 py-3">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="my-5 shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
            <Card.Body>
              <Card.Title className="display-4 font-weight-bold">{post.title}</Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                By: {post.author} -{' '}
                <small>
                  {new Date(post.creationDate).toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </small>
              </Card.Subtitle>
              <Card.Text className="text-justify">
                {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
              </Card.Text>

              {isAuthenticated ? (
                <button className="view-details-btn" onClick={() => handleViewDetails(post._id)}>
                  View Details
                </button>
              ) : (
                <button className="view-details-btn-notloggedin" onClick={handleLoginRedirect}>
                  Please log in to view details.
                </button>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </Container>
  );
}
