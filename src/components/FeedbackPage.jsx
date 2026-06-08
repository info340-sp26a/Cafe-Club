import { useState, useEffect } from "react";
import FeedbackBanner from "./FeedbackBanner";
import FeedbackCard from "./FeedbackCard";
import FeedbackTitle from "./FeedbackTitle";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";



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
              const menu = data[menuId];

      if (menu.ownerId === currentUser.uid || menu.owner === currentUser.uid) {
        if (menu.feedback) {
          Object.keys(menu.feedback).forEach((feedbackId) => {
            allFeedback.push({
              id: feedbackId,
              menuId: menuId,
              title: menu.title,
              from: "Staff",
              date: new Date(menu.feedback[feedbackId].createdAt).toLocaleDateString(),
              rating: "★".repeat(menu.feedback[feedbackId].rating),
              text: menu.feedback[feedbackId].text,
              image: "/img/menu1.png",
              status: menu.feedback[feedbackId].status || "pending"
            });
          });
        }
      }
    });

    setPendingFeedback(
      allFeedback.filter((feedback) => feedback.status === "pending")
    );

    setApprovedFeedback(
      allFeedback.filter((feedback) => feedback.status === "approved")
    );
  });

  return () => unsubscribe();
}, []);

    function approveFeedback(feedback){
        const db = getDatabase();

        update(ref(db, `menus/${feedback.menuId}/feedback/${feedback.id}`), {
        status: "approved"

        });

        // const updateApprovedFeedback = [feedback, ...approvedFeedback];

        // const updatePendingFeedback = pendingFeedback.filter((item) => {
        //     return item.id !== feedback.id
        // });

        // setApprovedFeedback(updateApprovedFeedback);
        // setPendingFeedback(updatePendingFeedback);
    }

    function rejectFeedback(feedback) {

        const db = getDatabase();

        remove(ref(db, `menus/${feedback.menuId}/feedback/${feedback.id}`));
        // const updatedPendingFeedback = pendingFeedback.filter((item) => {
        //     return item.id !== id;
        // });
        // setPendingFeedback(updatedPendingFeedback);
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