import React, {useState} from 'react';

export default function CustomizeMenu(props) {
  return (
    <>
        <div className="customize">

            <button type="button" className="collapsible" aria-expanded="true" aria-controls="customizeContent" aria-label="Expand Menu"><span className="material-icons" aria-label="Customize">palette</span></button> {/*make collapsible*/}
            
            <h2>Customize Menu Appearance</h2>

            <form action="menu.html" method="GET">
                <div className="customize-question">
                    <label htmlFor="chooseColor">Choose a menu color:</label>

                    <select name="menuColor" id="chooseColor">
                        <option value=""></option>
                        <option value="pink">Pink</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                    </select>
                </div>

                <div className="customize-question">
                    <label htmlFor="chooseStyle">Choose a menu style:</label>

                    <select name="menuStyle">
                        <option value=""></option>
                        <option value="fancy">Fancy</option>
                        <option value="rustic">Rustic</option>
                        <option value="modern">Modern</option>
                        <option value="cute">Cute</option>
                    </select>
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    </>
  );
}