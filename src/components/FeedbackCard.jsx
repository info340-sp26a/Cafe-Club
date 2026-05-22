export default function FeedbackCard({ feedback, showButtons, onApprove, onReject }) {
  return (
    <article className="feedback-card">
      <img className="tiny-menu" src={feedback.image} alt={`${feedback.title} preview`} />

      <h3>{feedback.title}</h3>

      <p className="feedback-source">
        From: {feedback.from} • Submitted {feedback.date}
      </p>

      <p><strong>Rating:</strong> {feedback.rating}</p>

      <p>{feedback.text}</p>

      {showButtons ? (
        <div className="feedback-actions">
          <button className="approve-btn" onClick={() => onApprove(feedback)}>
            Approve
          </button>

          <button className="reject-btn" onClick={() => onReject(feedback.id)}>
            Reject
          </button>
        </div>
      ) : (
        <p className="status">Status: Approved</p>
      )}
    </article>
  );
}