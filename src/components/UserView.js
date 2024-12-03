import { useState, useEffect } from 'react';
import { Card, Button, Spinner, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import CreatePostModal from './CreatePostModal';

export default function UserView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const notyf = new Notyf();
  const navigate = useNavigate();



  // Check if the user is authenticated by looking for a token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;
  console.log("isAuthenticated", isAuthenticated);

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

  /*get posts without refreshing*/
  const fetchPosts = () => {
    setLoading(true);
    fetch('https://blog-post-server.onrender.com/posts/getAllPosts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts.');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched posts after refresh:', data);
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
        notyf.error('Failed to load posts. Please try again later.');
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

  const handleViewDetails = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleLoginRedirect = () => {
    // Redirect to the login page if the user is not authenticated
    navigate('/login');
  };

  const handleCreatePostClick = () => {
    setShowCreateModal(true); // Show the modal when button is clicked
  };

  return (
    <Container className="my-5">
    <div className="functionalities-div text-center">
      {isAuthenticated && (
        <Button variant="primary" onClick={handleCreatePostClick} className="create-post-btn mb-4"  >
          Write something
        </Button>
      )}
    </div>

      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id} className="my-4 shadow-lg" style={{ maxWidth: '900px', margin: 'auto' }}>
            <Card.Body>
              {/* Title */}
              <Card.Title className="display-4 font-weight-bold">{post.title}</Card.Title>

              {/* Author and Date */}
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

              {/* Post Content */}
              <Card.Text className="text-justify">
                {post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
              </Card.Text>

              {/* "Read More" Button */}
              {isAuthenticated ? (
                <button className="view-details-btn" onClick={() => handleViewDetails(post._id)} >
                  View Details
                </button>
              ) : (
                <button className="view-details-btn-notloggedin" onClick={handleLoginRedirect} >
                  Please log in to view details.
                </button>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No posts available.</p>
      )}


      {/* Create Post Modal */}
      <CreatePostModal 
        show={showCreateModal} 
        onHide={() => setShowCreateModal(false)}
        refreshPosts={fetchPosts}
      />
    </Container>
  );
}
