import React, {useState} from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
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

    set(ref(db, `menus/${menuId}/accessCode`), formattedCode);

    setSavedCode(formattedCode);
    setAccessCode("");
    setShowModal(false);

    alert(`Access Code Saved: ${formattedCode.toUpperCase()}`);
  }

  return (
    <>
        <section className="banner container-fluid">
            <h1>  {currentUser?.displayName? `${currentUser.displayName}'s Menu`: "My Menu"} </h1>
            <button>
              <span className="material-icons">save</span>
              <span className="button-text">save</span>
            </button> 

            <button id="access-code" onClick={() => setShowModal(true)}>
              <span className="material-icons">send</span>
              <span className="button-text">Access Code: </span>
            </button>

        {savedCode && (
          <p className="saved-code">
            Access Code: <strong>{savedCode}</strong>
          </p>
        )}
      </section>

      {showModal && (
        <div className="modal-backdrop">
          <div className="access-modal">
            <h2>Set Access Code</h2>
            <p>Staff can use this code to review your menu.</p>

            <form onSubmit={handleSendToStaff}>
              <label htmlFor="menu-access-code">Access Code:</label>

              <input
                id="menu-access-code"
                type="text"
                value={accessCode}
                onChange={(event) =>
                  setAccessCode(event.target.value.toUpperCase())
                }
                placeholder="Ex: MATCHA42"
              />

              <div className="modal-actions">
                <button type="submit">Save Code</button>
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
      

        