export default function GetComments({ comments }) {
  if (!comments) {
    return null;
  }

  return (
    <div className="get-comments mt-5">
      {comments.length === 0 ? (
        <p className="no-comments text-center text-muted">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="comments-section" style={{ maxWidth: '800px', margin: 'auto' }}>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="comment-item d-flex align-items-start mb-3 p-3 border rounded shadow-sm"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              {/* User Initials as Avatar */}
              <div
                className="user-initials d-flex justify-content-center align-items-center fw-bold me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  color: 'white',
                  fontSize: '1.2rem',
                }}
              >
                {comment.userName ? comment.userName.charAt(0).toUpperCase() : '?'}
              </div>

              {/* Comment Content */}
              <div className="comment-content">
                <div className="comment-header d-flex justify-content-between">
                  <span className="comment-user fw-bold">{comment.userName}</span>
                </div>
                <div className="comment-date">
                  <small className="text-muted">{new Date(comment.creationDate).toLocaleString()}</small>
                </div>
                <p className="comment-text mt-1 mb-0">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
