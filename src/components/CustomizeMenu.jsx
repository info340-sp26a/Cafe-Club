import React, {useState} from 'react';
import { getDatabase, ref, set } from "firebase/database";
 
export default function CustomizeMenu(props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuColor, setMenuColor] = useState('');
  const [menuStyle, setMenuStyle] = useState('');

  function handleUpdate(event){
    event.preventDefault();
    const db = getDatabase();
    const customizeRef=ref(db, 'menuCustomization');
    set(customizeRef, {
      color: menuColor,
      style: menuStyle
    });
  }
 
  return (
    <>
        <div className="customize">
            <div className="customize-header">
                <button
                    type="button"
                    className="collapsible"
                    aria-expanded={isExpanded}
                    aria-controls="customizeContent"
                    aria-label={isExpanded ? "Collapse Menu" : "Expand Menu"}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className="material-icons customize-arrow">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                </button>
            </div>
 
            {isExpanded && (
                <>
                <h2>Customize Menu Appearance</h2>
                <form id="customizeContent" onSubmit={handleUpdate}>
                    <div className="customize-question">
                        <label htmlFor="chooseColor">Choose a menu color:</label>
 
                        <select name="menuColor" id="chooseColor" value={menuColor} onChange={(event) => setMenuColor(event.target.value)}>
                            <option value=""></option>
                            <option value="pink">Pink</option>
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                            <option value="blue">Blue</option>
                        </select>
                    </div>
 
                    <div className="customize-question">
                        <label htmlFor="chooseStyle">Choose a menu style:</label>
 
                        <select name="menuStyle" id="chooseStyle" value={menuStyle} onChange={(event) => setMenuStyle(event.target.value)}>
                            <option value=""></option>
                            <option value="fancy">Fancy</option>
                            <option value="rustic">Rustic</option>
                            <option value="modern">Modern</option>
                            <option value="cute">Cute</option>
                        </select>
                    </div>
 
                    <button type="submit">Update</button>
                </form>
                </>
            )}
        </div>
    </>
  );
}