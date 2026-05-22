import { useState } from "react";
import FeedbackBanner from "./FeedbackBanner";
import FeedbackCard from "./FeedbackCard";

const initialPending = [
    {
        id: 1,
        title: "Isabella's Menu",
        from: "Divya",
        date: "May 21, 2026",
        rating: "★★★★☆",
        text: "The drink names are cute, but the seasonal section could be better",
        image: "/img/menu1.png"
    },
    {
        id: 2,
        title: "Divya's Menu",
        from: "Isabella",
        date: "May 22, 2026",
        rating: "★★★★★",
        text: "The menu is easy to follow and the visuals are helpful.",
        image: "/img/menu2.png"
    }
];

const initialApproved = [
    {
        id: 3,
        title: "Cafe Yoka Menu",
        from: "Isabella",
        date: "May 21, 2026",
        rating: "★★★★★",
        text: "The pictures and visuals are helpful for customers.",
        image: "/img/template1.png"
    },
    {
        id: 4,
        title: "Phe",
        from: "Tatevik",
        date: "May 30, 2026",
        rating: "★★★★★",
        text: "I wish we had more items on the menu, it feels a little bit limited",
        image: "/img/template1.png"
    }
];

export default function FeedbackPage() {
    const [pendingFeedback, setPendingFeedback] = useState(initialPending);
    const [approvedFeedback, setApprovedFeedback] = useState(initialApproved);

    function approveFeedback(feedback) {
        setApprovedFeedback([feedback, ...approvedFeedback]);
        setPendingFeedback(
            pendingFeedback.filter(item => item.id !== feedback.id)
        );
    }

    function rejectFeedback(id) {
        setPendingFeedback(
            pendingFeedback.filter(item => item.id !== id)
        );
    }

    return (
        <main className="feedback-main">
            <FeedbackBanner
                pendingCount={pendingFeedback.length}
                approvedCount={approvedFeedback.length}
            />

            <div className="feedback-flexbox">
                <section className="feedback-column">
                    <h2>Pending Feedback</h2>

                    {pendingFeedback.length === 0 ? (
                        <p>No pending feedback right now!</p>
                    ) : (
                        pendingFeedback.map(feedback => (
                            <FeedbackCard
                                key={feedback.id}
                                feedback={feedback}
                                showButtons={true}
                                onApprove={approveFeedback}
                                onReject={rejectFeedback}
                            />
                        ))
                    )}
                </section>

                <section className="feedback-column approved-section">
                    <h2>Approved Feedback History</h2>

                    {approvedFeedback.map(feedback => (
                        <FeedbackCard
                            key={feedback.id}
                            feedback={feedback}
                            showButtons={false}
                        />
                    ))}
                </section>
            </div>
        </main>
    );
}