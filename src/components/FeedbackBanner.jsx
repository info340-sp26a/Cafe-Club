import SummaryCard from "./SummaryCard";

export default function FeedbackBanner({ pendingCount, approvedCount }) {
  return (
    <section className="feedback-banner">
      <img className="sparkle sparkle-left" src="/img/rabbit.svg" alt="rabbit icon" />
      <img className="sparkle sparkle-right" src="/img/rabbit.svg" alt="rabbit icon" />

      <p className="banner-subtext">
        Review Feedback, Approve Submission and Track Feedback History
      </p>

      <div className="feedback-summary">
        <SummaryCard icon="/img/pending.png" label={`${pendingCount} Pending`} />
        <SummaryCard icon="/img/approved.png" label={`${approvedCount} Approved`} />
        <SummaryCard icon="/img/history.png" label="Feedback History" />
      </div>
    </section>
  );
}