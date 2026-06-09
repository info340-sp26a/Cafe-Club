import { useState, useEffect } from "react";
import FeedbackBanner from "./FeedbackBanner";
import FeedbackCard from "./FeedbackCard";
import FeedbackTitle from "./FeedbackTitle";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';


export default function FeedbackPage() {
    const [pendingFeedback, setPendingFeedback] = useState([]);
    const [approvedFeedback, setApprovedFeedback] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");

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


      if (menu.ownerId === currentUser.uid) {
        if (menu.feedback) {
          Object.keys(menu.feedback).forEach((feedbackId) => {
            allFeedback.push({
              id: feedbackId,
              menuId: menuId,
              title: menu.title,
              from: currentUser.displayName,
              date: new Date(menu.feedback[feedbackId].createdAt).toLocaleDateString(),
              rating: "★".repeat(menu.feedback[feedbackId].rating),
              text: menu.feedback[feedbackId].text,
              menu: menu,
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

   async function approveFeedback(feedback){
    try {
        const db = getDatabase();

        await update(ref(db, `menus/${feedback.menuId}/feedback/${feedback.id}`), {
        status: "approved"

        });

    
    }
    catch (err){

        setAlertMessage("Please try again!")
    }
    }

    async function rejectFeedback(feedback) {

        try {
        const db = getDatabase();

        remove(ref(db, `menus/${feedback.menuId}/feedback/${feedback.id}`));

    }
    catch (err){
        setAlertMessage("Please try again!");
    }
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
                {alertMessage && (<Alert variant="info" dismissible onClose={() => setAlertMessage("")}>
        {alertMessage}
      </Alert>
    )}

            <FeedbackBanner
                pendingCount={pendingFeedback.length}
                approvedCount={approvedFeedback.length}
            />
            </div>
            <div className="feedback-flexbox">
                <section className="feedback-column">
                    <h2>Recent Feedback</h2>

                    {pendingFeedback.length === 0 && (
                        <p>No feedback right now!</p>
                    )} 

                    {pendingFeedback.length > 0 && pendingFeedbackCards}
                </section>

                <section className="feedback-column approved-section">
                    <h2>Reviewed Feedback History</h2>

                    {approvedFeedbackCards}
                </section>
            </div>
        </main>
    );
}