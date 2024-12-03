import { useState, useEffect } from 'react';
import { Table, Spinner, Container } from 'react-bootstrap';
import AdminDeletePost from './AdminDeletePost';

export default function AdminView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    fetch('https://blog-post-server.onrender.com/posts/getAllPosts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      });
  };

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId); 
    setShowDeleteModal(true); 
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
    <Container className="my-5 text-center">
      <h2 className="text-center mb-5">Admin Dashboard</h2>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Author</th>
            <th>Date Created</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>
                {new Date(post.creationDate).toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </td>
              <td>
                {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
              </td>
              <td className="d-flex justify-content-center align-items-center" style={{ height: '120px' }}>
                <button className="btn btn-outline-primary btn-sm mx-2">View</button>
                <button
                  className="btn btn-outline-danger btn-sm mx-2"
                  onClick={() => handleDeleteClick(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Post Modal */}
      {selectedPostId && (
        <AdminDeletePost
          postId={selectedPostId}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          refreshPosts={fetchPosts}
        />
      )}
    </Container>
  );
}
