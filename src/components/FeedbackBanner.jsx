import SummaryCard from "./SummaryCard";

export default function FeedbackBanner({ pendingCount, approvedCount }) {
  return (
    <section className="feedback-banner">
      <img className="bunny-left" src="/img/rabbit.svg" alt="rabbit icon" />
      <img className="bunny-right" src="/img/rabbit.svg" alt="rabbit icon" />

      <p className="banner-subtext">
        Review Feedback, Approve Submission and Track Feedback History
      </p>

      <div className="feedback-summary">
        <SummaryCard icon="/img/loading.svg" iconClass="star-icon" label={`${pendingCount} Pending`} />
        <SummaryCard icon="/img/approved.svg" label={`${approvedCount} Approved`} />
      </div>
    </section>
  );
}