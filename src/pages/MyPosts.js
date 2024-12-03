import { useState, useEffect } from 'react';
import { Card, Spinner, Container } from 'react-bootstrap';
import { Notyf } from 'notyf';
import CreatePostModal from '../components/CreatePostModal';

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const notyf = new Notyf();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    fetch('https://blog-post-server.onrender.com/posts/getMyPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPosts(data);
        }
      })
      .catch((err) => {
        setError('Failed to fetch posts. Please try again later.');
        notyf.error('Error fetching posts');
      })
      .finally(() => {
        setLoading(false);
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
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Container className="my-5">
      <h2 className="mt-5 mb-3 text-center">My Posts</h2>
      <div className="functionalities-div text-center">
        <button
          className="btn btn-primary create-post-btn"
          onClick={() => setShowCreateModal(true)}
        >
          Write something
        </button>
      </div>
      
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="my-4 shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
            <Card.Body className="my-5">
              <Card.Title className="display-4 font-weight-bold mb-3 text-center">{post.title}</Card.Title>
              <Card.Subtitle className="text-muted mb-5 text-center">
                By: Me -{' '}
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
                {post.content.length > 500 ? post.content.substring(0, 500) + '...' : post.content}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts available.</p>
      )}

      <CreatePostModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        refreshPosts={fetchMyPosts}
      />

      <div className="text-center mt-5">
        <p>
          <a href="/posts">Back to Blog Posts</a>
        </p>
      </div>
    </Container>
  );
}
