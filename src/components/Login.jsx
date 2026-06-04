import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault()

        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter in a valid username or password!")
            return;
        }
        alert('Welcome back, ${username}!');

    }
    return (

        <main className="auth-page">
            <section className="auth-card">
                <img className="bunny-left" src="/img/rabbit.svg" alt="rabbit icon" />
                 <img className="bunny-right" src="/img/rabbit.svg" alt="rabbit icon" />
                <h1> ⋅Welcome Back!⋅  </h1>
                <p>Login back into your Club Cafe account!  </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label htmlFor="username">Username: </label>
                    <input 
                    id="username"
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}/>

                    <label htmlFor="password">Password: </label>
                    <input 
                    id="password"
                    type="text"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}/>

                    <button type="submit">Login</button>

                </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                    ‪ଘ( つ⁰̷̴͈ ᵕ ˘͈)つ* 🍵
                </p>


            </section>

        </main>

    );
}
