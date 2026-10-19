
import MenuThumbnail from "./MenuThumbnail";


export default function FeedbackCard({ feedback, showButtons, onApprove, onReject }) {



  function handleApproveClick(){
    onApprove(feedback);
  }

  function handleRejectClick() {
    onReject(feedback);
  }

  let actionContent = <p className="status"> Status: Reviewed </p>

  if (showButtons) {
    actionContent = (
      <div className="feedback-actions">
      <button className="approve-btn" onClick={handleApproveClick}>Mark Reviewed 
      </button>

      <button className="reject-btn" onClick={handleRejectClick}>Remove
      </button>

      </div>
    );

    }
  return (
    <article className="feedback-card">
      <MenuThumbnail menu={feedback.menu} />
      <div className="feedback-details">
      <h3>{feedback.title}</h3>

      <p className="feedback-source">
        From: {feedback.from} • Submitted {feedback.date}
      </p>

      <p><strong>Rating:</strong> {feedback.rating}</p>

      <p>{feedback.text}</p>
      {actionContent}
      </div>
    </article>
  );
}