import { useState, useEffect } from 'react';
import { Table, Spinner, Container } from 'react-bootstrap';

export default function AdminView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the posts from the backend API for Admin
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
    <Container className="my-5 text-center">
      <h2 className="text-center">Admin Dashboard</h2>
      {/* Posts Table */}
      <Table striped bordered hover responsive>
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
              <td>
                <button className="btn btn-outline-primary btn-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
