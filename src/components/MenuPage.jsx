import React, {useState} from 'react';
import { getDatabase, ref, push } from "firebase/database";
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import MenuContainer from './MenuContainer';



export default function MenuPage(props) {
    const [menuId, setMenuId] = useState(null);
    const[menuTitle, setMenuTitle] = useState("");

    function createMenu(event){
        event.preventDefault();
        const db = getDatabase();
        const menuRef = ref(db, 'menus');
        const newMenuRef = push(menuRef,{
            title: menuTitle,
            createdAt: Date.now()
        });
        setMenuId(newMenuRef.key);
        setMenuTitle("");
        }

    return (
    <> 
        <MenuBanner />
        <form onSubmit={createMenu}>
          <label className="menuTitle" htmlFor="menuTitle">Menu Title:</label>
          <input
           className="menuTitle"
            id="menuTitle"
            type="text"
            value={menuTitle}
            onChange={(event) => setMenuTitle(event.target.value)}
            placeholder="Enter menu title"
          />
          <button className="menuTitle"  type="submit">Create Menu</button>
        </form>
        {menuId &&(
        <div className="menu-editor-layout">
            <CustomizeMenu menuId={menuId}/>

            <MenuContainer menuId={menuId} />
        </div>
        )}
    </>
  );
}

