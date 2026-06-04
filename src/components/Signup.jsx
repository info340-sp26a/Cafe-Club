import { useState } from "react";
import { Link } from "react-router";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            alert("Please fill out the required fields!");
            return;
        }

        alert("Account has been created!")
}

return (
    <main className='auth-page'>
        <section className='auth-card'>


            <h1>🍰 Join Cafe Club 🍰</h1>
            <p> Create an account to save and customize menus</p>

            <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="name">Name:</label>
                    <input 
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>

                   <label htmlFor="Email">Email:</label>
                    <input 
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>

                    <label htmlFor="password">Password:</label>
                    <input 
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>


                    <button type="submit">Sign Up!</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>




        </section>

    </main>
);
}