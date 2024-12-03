import { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();


export default function CreatePostModal({ show, onHide, refreshPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSubmit = () => {
    if (!title || !content) {
      setError("Both title and content are required.");
      return;
    }

    setLoading(true);
    setError(null); 

    const postData = { title, content };

    const token = localStorage.getItem('token');
    console.log("here", token);

    // If token is not found, show an error message
    if (!token) {
      notyf.error('Authentication token is missing. Please log in.');
      onHide();
      setLoading(false);
      return;
    }

    // Sending post data to the backend using fetch
    fetch('https://blog-post-server.onrender.com/posts/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Post created successfully:', data);
        notyf.success('Post created successfully!');
        refreshPosts();
        onHide();
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        notyf.error('Failed to add movie. Please try again.');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create new post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContent">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
