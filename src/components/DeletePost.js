import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeletePost({ postId, show, onHide, refreshPosts }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const notyf = new Notyf();

  const handleDelete = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    fetch(`https://blog-post-server.onrender.com/posts/deletePost/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          notyf.error('Failed to delete post');
        } else {
          notyf.success('Post deleted successfully');
          refreshPosts();
          onHide();
        }
      })
      .catch((err) => {
        setError('Failed to delete post. Please try again later.');
        notyf.error('Error deleting post');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
