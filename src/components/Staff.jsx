import { useState , useEffect} from "react";
import { Link, useParams } from "react-router";
import { getDatabase, ref, push, onValue } from "firebase/database"
import Alert from 'react-bootstrap/Alert';
import { bgColors, fontColors } from './menuColors';


export default function Staff() {

    const { menuId } = useParams();
    const [menuTitle, setMenuTitle] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage ] = useState("");
    const [rating, setRating] = useState(0);

    const [alertMessage, setAlertMessage] = useState("");
    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        if(!menuId){
            return;
        }

        const db = getDatabase();
        const menuRef = ref(db, `menus/${menuId}`); 
        
        onValue(menuRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setMenuTitle(data.title);
                setMenuData(data);
            }
        });

    }, [menuId]);


    const starButton = [1, 2, 3, 4, 5].map((star) => {
        function handleStarClick(){
            setRating(star);
        }
        return(
                <button type="button" 
                key={star} 
                className={star <= rating ? 
                    "star selected" : "star"} 
                onClick= {handleStarClick}
                >★</button>
    );
    });


async function handleSubmit(event) {

    event.preventDefault();

    if (!menuId){
        setAlertMessage("No menu selected")
        return;

    }

    if (feedback.trim() === ""){
        setAlertMessage("please enter feedback")

        return;
    }

    const db = getDatabase();

    try {

        await 
        push(ref(db, `menus/${menuId}/feedback`),
            {
                rating: rating,
                text: feedback,
                status: "pending",
                createdAt: Date.now()
            }
        );
        setAlertMessage("message sucess")
        setFeedback("")
        setRating(0);

}
catch(err){
    setAlertMessage("Failed to send feedback. Please try again.")

}
}

    
    return(

    <main>

    <div className="quotes">
    <img className="matcha" src="/img/matcha.jpeg" alt="A picture of a matcha drink"/> 
    <p className="quote"> Live Life With Passion and Intention </p>
    </div>

    <section className="menu-selection">

    <h1 className="message"> {menuTitle ? menuTitle : "Menu"} </h1>


    <div className="menu">
        <div className="menu-container">
            {menuData && Object.values(menuData.sections ?? {}).map((section, i) => {
              const color = menuData.customization?.color || "";
              const bgColor = bgColors[color] || "";
              const fontColor = fontColors[color] || "";
              return (
                <div key={i} className="menu-section-preview" style={{ backgroundColor: bgColor, color: fontColor }}>
                    <div className="menu-section-header">
                        <h3 className="menu-section-title">{section.name}</h3>
                    </div>
                    {Object.values(section.items ?? {}).map((item, j) => (
                        <div key={j} className="menu-item-row">
                            <p className="menu-item-name">{item.name}</p>
                            <p className="menu-item-price">${item.price}</p>
                        </div>
                    ))}
                </div>
              );
            })}
            {menuData && Object.keys(menuData.sections ?? {}).length === 0 && (
                <p>This menu has no sections yet.</p>
            )}
        </div>
    </div>
    </section>

    <section className="Send">
        <h2 className="message">Send A Message to the Owner of the Menu</h2>
            <p>You are able to give feedback and suggestions</p>
            <p>Please rate the Menu</p>

        
        <form className ="feedback-form" onSubmit={handleSubmit}>
            <label htmlFor="feedback">Feedback:</label>
            <textarea name="feedback" id="feedback" placeholder="Write Your Feedback Here" 
            value={feedback} 
            onChange={(event) => setFeedback(event.target.value)}>
            </textarea>
        
           <div className="stars">
            {starButton}
</div>

<p className="rating-text">
    Selected Rating: {rating}
</p>

    <button type="submit" className="send-btn">Send</button>
    {alertMessage && (<Alert variant="success" dismissible onClose={() => setAlertMessage("")}> {alertMessage}
  </Alert>
    )}
    </form>


    </section>
</main>

 
    );
}