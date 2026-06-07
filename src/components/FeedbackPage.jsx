import { useState, useEffect } from "react";
import FeedbackBanner from "./FeedbackBanner";
import FeedbackCard from "./FeedbackCard";
import FeedbackTitle from "./FeedbackTitle";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

function handleSubmit(event) {
    event.preventDefault();
    const db = getDatabase();

    push(ref(db, "feedback"), {
        rating: rating,
        message: feedback,
        createdAt: Date.now(),
        author: currentUser.email
    });
    alert("Feedback Submitted!!")

}


// const initialPending = [
//     {
//         id: 1,
//         title: "Isabella's Menu",
//         from: "Divya",
//         date: "May 21, 2026",
//         rating: "★★★★☆",
//         text: "The drink names are cute, but the seasonal section could be better",
//         image: "/img/menu1.png"
//     },
//     {
//         id: 2,
//         title: "Divya's Menu",
//         from: "Isabella",
//         date: "May 22, 2026",
//         rating: "★★★★★",
//         text: "The menu is easy to follow and the visuals are helpful.",
//         image: "/img/menu2.png"
//     }
// ];

// const initialApproved = [
//     {
//         id: 3,
//         title: "Cafe Yoka Menu",
//         from: "Isabella",
//         date: "May 21, 2026",
//         rating: "★★★★★",
//         text: "The pictures and visuals are helpful for customers.",
//         image: "/img/template1.png"
//     },
//     {
//         id: 4,
//         title: "Phe",
//         from: "Tatevik",
//         date: "May 30, 2026",
//         rating: "★★★★★",
//         text: "I wish we had more items on the menu, it feels a little bit limited",
//         image: "/img/template1.png"
//     }
// ];

export default function FeedbackPage() {
    const [pendingFeedback, setPendingFeedback] = useState([]);
    const [approvedFeedback, setApprovedFeedback] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser){
            return;
        }

        const db = getDatabase();
        const menuRef = ref(db, "menus");

      const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();

      if (!data){
        setPendingFeedback([]);
        setApprovedFeedback([]);
        return;
      }

      const allFeedback = [];

      Object.keys(data).forEach((menuId) => {
        
      })
    })

    function approveFeedback(feedback){
        const updateApprovedFeedback = [feedback, ...approvedFeedback];

        const updatePendingFeedback = pendingFeedback.filter((item) => {
            return item.id !== feedback.id
        });

        setApprovedFeedback(updateApprovedFeedback);
        setPendingFeedback(updatePendingFeedback);
    }

    function rejectFeedback(id) {
        const updatedPendingFeedback = pendingFeedback.filter((item) => {
            return item.id !== id;
        });
        setPendingFeedback(updatedPendingFeedback);
    }


    const pendingFeedbackCards = pendingFeedback.map((feedback) =>{
        return(
            <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            showButtons={true}
            onApprove={approveFeedback}
            onReject={rejectFeedback}
            />
        );
    });

    const approvedFeedbackCards = approvedFeedback.map((feedback) => {
        return(
            <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            showButtons={false}
            />
        );
    });

    return (
        <main className="feedback-main">
            <div className="title-banner">
            <FeedbackTitle />
            <FeedbackBanner
                pendingCount={pendingFeedback.length}
                approvedCount={approvedFeedback.length}
            />
            </div>
            <div className="feedback-flexbox">
                <section className="feedback-column">
                    <h2>Pending Feedback</h2>

                    {pendingFeedback.length === 0 && (
                        <p>No pending feedback right now!</p>
                    )} 

                    {pendingFeedback.length > 0 && pendingFeedbackCards}
                </section>

                <section className="feedback-column approved-section">
                    <h2>Approved Feedback History</h2>

                    {approvedFeedbackCards}
                </section>
            </div>
        </main>
    );
}