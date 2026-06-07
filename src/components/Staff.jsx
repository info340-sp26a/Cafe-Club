
import { useState , useEffect} from "react";
import { Link, useParams } from "react-router";
import { getDatabase, ref, push, onValue } from "firebase/database"



export default function Staff() {

    const { menuId } = useParams();
    const [menuTitle, setMenuTitle] = useState("");
    const [feedback, setFeedback] = useState("");
    const [message, setMessage ] = useState("");
    const [rating, setRating] = useState(0);
    const starButton = [1, 2, 3, 4, 5].map((star) => {


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
            }
        });

    }, [menuId]);

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
        alert("No menu selected")
        return;

    }

    if (feedback.trim() === ""){
        alert("please enter feedback")

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
        alert("message sucess")
        setFeedback("")
        setRating(0);

}
catch(err){
    console.error(err);

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


    <div className="flex-container">
    <div className="item">

    </div>
    <Link className="menu-link owner-menu menu" to={`/menu/${menuId}`}>Click to see {menuTitle ? menuTitle : "This menu"}</Link>
    </div>
    </section>

    <section className="Send">
        <h2 className="message">Send A Message to the Owner of the Menu</h2>
            <p>You are able to give feedback and suggestions</p>
            <p>Please rate the Menu</p>

        
        <form className ="feedback-form" onSubmit={handleSubmit}>
            <label htmlFor="feedback">Feedback:</label>
            <textarea id="feedback" placeholder="Write Your Feedback Here" 
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
    </form>

    </section>
</main>

 
    );
}
