import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function AddComment({ postId, refreshComments }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const notyf = new Notyf();

  const handleAddComment = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');

    if (!token) {
      notyf.error('You need to be logged in to add a comment.');
      setLoading(false);
      return;
    }

    fetch(`https://blog-post-server.onrender.com/posts/addComment/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          notyf.error('Failed to add comment.');
        } else {
          notyf.success('Comment added successfully.');
          setComment('');
          refreshComments(); // Refresh comments after adding a new one
        }
      })
      .catch(() => {
        setError('Failed to add the comment. Please try again later.');
        notyf.error('An error occurred.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="add-comment my-3">

      {error && <Alert variant="danger">{error}</Alert>}
      <Form
        onSubmit={handleAddComment}
        className="custom-comment-form"
        style={{
          maxWidth: '800px',
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            style={{
              resize: 'none',
              borderRadius: '5px',
            }}
          />
        </Form.Group>
        <div className="text-end mt-3">
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !comment.trim()}
            style={{ minWidth: '100px' }}
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
