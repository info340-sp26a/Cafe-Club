import React, {useState, useEffect} from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
 
export default function CustomizeMenu(props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuColor, setMenuColor] = useState("");
  const [menuStyle, setMenuStyle] = useState("");

    useEffect(()=>{
    if (!props.menuId) {
        return;
    }
    const db=getDatabase();
    const customizeRef=ref(db,'menus/'+props.menuId+'/customization');
    const unsubscribe= onValue(customizeRef, (snapshot)=>{
      const data=snapshot.val();
      if (data){
        setMenuColor(data.color || '');
        setMenuStyle(data.style || '');
      }
    });
    return() => unsubscribe(); }, [props.menuId]);

  function handleUpdate(event){
    event.preventDefault();
    const db = getDatabase();
    const customizeRef=ref(db, 'menus/' + props.menuId + '/customization');
    set(customizeRef, {
      color: menuColor,
      style: menuStyle
    });
     props.onColorChange(menuColor);
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
                        <label className="menuText" htmlFor="chooseColor">Choose a menu color:</label>
 
                        <select name="menuColor" id="chooseColor" value={menuColor} onChange={(event) => setMenuColor(event.target.value)}>
                            <option value=""></option>
                            <option value="pink">Pink</option>
                            <option value="green">Green</option>
                            <option value="yellow">Yellow</option>
                            <option value="blue">Blue</option>
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