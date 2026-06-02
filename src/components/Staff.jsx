
import { useState } from "react";
import { Link } from "react-router";


export default function Staff() {
    const [rating, setRating] = useState(0);
    const starButton = [1, 2, 3, 4, 5].map((star) => {
        function handleStarClick(){
            setRating(star);
        }
        return(
                <button type="button" 
                key={star} 
                className={star <= rating ? 
                    "star selected" : "star"} 
                onClick={() => setRating(star)}
                >★</button>
    );
    });
    
    return(

    <main>

    <div className="quotes">
    <img className="matcha" src="/img/matcha.jpeg" alt="A picture of a matcha drink"/> 
    <p className="quote"> Live Life With Passion and Intention </p>
    </div>

    <section className="menu-selection">

    <h1 className="message">Isabella's Menu </h1>


    <div className="flex-container">
    <div className="item">

    </div>
    <Link className="menu-link owner-menu menu" to="/menu">Click to see Isabella's Menu!</Link>
    </div>
    </section>

    <section className="Send">
        <h2 className="message">Send A Message to the Creator</h2>
            <p>You are able to give feedback and suggestions</p>
            <p>Please rate the Menu</p>

        
        <form className ="feedback-form">
            <label htmlFor="feedback">Feedback:</label>
            <textarea id="feedback" placeholder="Write Your Feedback Here"></textarea>
        
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
