import React, {useState} from 'react';

export default function MenuBanner(props) {
  return (
    <>
        <section class="banner">
            <h1> Divya's Menu </h1>
            <button><span class="material-icons">save</span> <span class="button-text">save</span></button> {/*will be a form*/}
            <button id="sendStaff"><span class="material-icons">send</span><span class="button-text">send to staff</span></button> {/*will be a modal*/}
        </section>
    </>
  );
}


        