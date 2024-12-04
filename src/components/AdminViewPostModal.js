import { Modal, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AdminViewPostModal({ postId, show, onHide }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && postId) {
      setLoading(true);
      // Fetch post details
      fetch(`https://blog-post-server.onrender.com/posts/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load post details.');
          setLoading(false);
        });
    }
  }, [show, postId]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Post Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <h3>{post.title}</h3>
            <p>
              <strong>Author:</strong> {post.author}
            </p>
            <p>
              <strong>Created On:</strong>{' '}
              {new Date(post.creationDate).toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
              })}
            </p>
            <p>
              <strong>Content:</strong> {post.content}
            </p>
            <hr />
            <h5>Comments</h5>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="mb-3">
                  <p>
                    <strong>{comment.userName}</strong> -{' '}
                    <small>
                      {new Date(comment.creationDate).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                      })}
                    </small>
                  </p>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
