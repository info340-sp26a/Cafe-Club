import React, {useState} from 'react';
import { getDatabase, ref, push, set } from "firebase/database";
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import { getAuth } from "firebase/auth";


import MenuContainer from './MenuContainer';



export default function MenuPage(props) {
    const [menuId, setMenuId] = useState(null);
    const[menuTitle, setMenuTitle] = useState("");
    const [currentMenuTitle, setCurrentMenuTitle] = useState("");

    function createMenu(event){
        event.preventDefault();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const db = getDatabase();
        const menuRef = ref(db, 'menus');
        const newMenuRef = push(menuRef,{
            title: menuTitle,
            owner: currentUser,
            ownerName: currentUser.displayName,
            createdAt: Date.now()
        });
        setMenuId(newMenuRef.key);
        setCurrentMenuTitle(menuTitle);
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
       {menuId && (
        <div>
          <h2 className="currMenuTitle">{currentMenuTitle}</h2>

          <div className="menu-editor-layout">
            <CustomizeMenu menuId={menuId}/>
            <MenuContainer menuId={menuId} />
          </div>
        </div>
      )}
    </>
  );
}

