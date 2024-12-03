import { useState, useEffect } from 'react';
import { Card, Spinner, Container } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notyf = new Notyf();

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = () => {
    setLoading(true);

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    // Fetch the user's posts
    fetch('https://blog-post-server.onrender.com/posts/getMyPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
      <h2 className="my-5 text-center">My Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="my-4 shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
            <Card.Body className="my-5">
              {/* Title */}
              <Card.Title className="display-4 font-weight-bold mb-3 text-center">{post.title}</Card.Title>

              {/* Author and Date */}
              <Card.Subtitle className="text-muted mb-5 text-center">
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

              {/* Post Content */}
              <Card.Text className="text-justify">
                {post.content.length > 500 ? post.content.substring(0, 500) + '...' : post.content}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts available.</p>
      )}


      <div className="text-center mt-5">
        <p>
           <a href="/posts">Back to Blog Posts</a>
        </p>
      </div>
    </Container>
  );
}
