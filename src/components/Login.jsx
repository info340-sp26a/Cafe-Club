import { useState } from "react";
import { Link } from "react-router";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/dist/StyledFirebaseAuth";

export default function Login() {
    const auth = getAuth();


    const firebaseUIConfig = {
        signInOptions: 
        [GoogleAuthProvider.PROVIDER_ID, {
            
            provider: EmailAuthProvider.PROVIDER_ID,
            requiredDisplayName:true}]
            ,

         signInFlow: "popup",
         credentialHelper: "none",
         callbacks: {
                signInSuccessWithAuthResult: () => {
                return false;
            }
         }

    };

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

                <StyledFirebaseAuth.default
                    uiConfig={firebaseUIConfig}
                    firebaseAuth={auth}
                />

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
