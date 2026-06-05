import React, {useState} from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from "firebase/auth";



export default function MenuBanner(props) {
  const [accessCode, setAccessCode] = useState("");
  const [savedCode, setSavedCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  function handleOpenModal(){
    setShowModal(true);
  }

  function handleCloseModal(){
    setShowModal(false);
  }

  function handleSendToStaff(event) {
    event.preventDefault()


    if (accessCode.trim() === ""){
      alert("Please Enter an Access Code!");
      return;
    }
    const db = getDatabase();
    const formattedCode = accessCode.toUpperCase();

    push(ref(db,"menus"), {
      title: `${currentUser.displayName}'s menu`,
      accessCode: accessCode.toUpperCase(),
      owner: currentUser.uid,
      createdAt: Date.now(),
    });

    setSavedCode(formattedCode);
    setAccessCode("");
    setShowModal(false);

    alert(`Access Code Saved: ${formattedCode.toUpperCase()}`);
  }
  return (
    <>
        <section className="banner container-fluid">
            <h1> Divya's Menu </h1>
            <button>
              <span className="material-icons">save</span>
               <span className="button-text">save</span>
               </button> {/*will be a form*/}
            <button id="access-code" onClick={() => setShowModal(true)}>
              <span className="material-icons">send
              </span>
              <span className="button-text">Access Code:

              </span>
              </button> {/*will be a modal*/}
        </section>
    </>
  );
}


        