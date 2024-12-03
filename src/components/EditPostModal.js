import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

export default function EditPostModal({ show, onHide, post, refreshPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'content') setContent(value);
  };

  // Handle the update operation
  const handleUpdate = () => {
    if (!title || !content) {
      setError('Both title and content are required.');
      return;
    }

    setLoading(true);
    setError(null);

    const updatedPost = {
      title,
      content,
    };

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('Authentication token is missing. Please log in.');
      setLoading(false);
      return;
    }

    fetch(`https://blog-post-server.onrender.com/posts/editPost/${post._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Post updated successfully') {
          notyf.success('Post updated successfully!');
          refreshPosts();
          onHide();
        } else {
          notyf.error('Failed to update post. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        notyf.error('Failed to update post. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group controlId="postTitle" className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleChange}
              name="title"
              placeholder="Enter the post title"
            />
          </Form.Group>

          <Form.Group controlId="postContent" className="mb-3">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={handleChange}
              name="content"
              placeholder="Enter the post content"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
