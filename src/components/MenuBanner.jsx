import React, {useState} from 'react';

export default function MenuBanner(props) {
  return (
    <>
        <section className="banner container-fluid">
            <h1> Divya's Menu </h1>
            <button><span className="material-icons">save</span> <span className="button-text">save</span></button> {/*will be a form*/}
            <button id="sendStaff"><span className="material-icons">send</span><span className="button-text">send to staff</span></button> {/*will be a modal*/}
        </section>
    </>
  );
}


        