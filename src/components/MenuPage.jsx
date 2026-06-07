import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import { getAuth } from "firebase/auth";


import MenuContainer from './MenuContainer';



export default function MenuPage(props) {
    const {menuId, urlMenuId} = useParams();
    const[menuTitle, setMenuTitle] = useState("");
    const [currentMenuTitle, setCurrentMenuTitle] = useState("");

    useEffect(() => {
        if (!urlMenuId){
            return;
        }

        const db = getDatabase();
        const menuRef = ref(db, `menus/${urlMenuId}`);
        const unsubscribe = onValue(menuRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setMenuId(urlMenuId);
                setCurrentMenuTitle(data.title);
            }
    });
    return () => unsubscribe(); }, [urlMenuId]);

    function createMenu(event){
        event.preventDefault();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            console.error("No user logged in");
            return;
        }
        
        const db = getDatabase();
        const menuRef = ref(db, 'menus');
        const newMenuRef = push(menuRef,{
            title: menuTitle,
            ownerId: currentUser.uid,
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

