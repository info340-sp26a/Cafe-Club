import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import { getAuth } from "firebase/auth";


import MenuContainer from './MenuContainer';



export default function MenuPage(props) {
    const navigate = useNavigate();
    const { menuId: urlMenuId } = useParams();
    const [menuId, setMenuId] = useState(null);
    const [menuTitle, setMenuTitle] = useState("");
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
        return () => unsubscribe(); 
    }, [urlMenuId]);


    async function handleDelete() {
        if (!menuId){
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this?");

        if (!confirmDelete){
            return;
        }

        try{

            const db = getDatabase();

            await remove(ref(db, `menus/${menuId}`));
            alert("menu deleted");
            navigate("/")
        }
            catch(err)  {
            console.error(err);
            alert("failed to delete");
        }
    }   

    function createMenu(event){
        event.preventDefault();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            console.error("No user logged in");
            return;
        }

        if (menuTitle.trim() === "") {
        alert("Please enter a menu title!");
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
       {menuId && <MenuBanner menuId={menuId} onDelete={handleDelete}/>}
       
       {!menuId && ( <form onSubmit={createMenu}>
          <label className="menuTitle" htmlFor="menuTitle">Menu Title:</label>
          <input
           className="menuTitle"
            id="menuTitle"
            type="text"
            value={menuTitle}
            onChange={(event) => setMenuTitle(event.target.value)}
            placeholder="Enter menu title"
            required
          />
          <button className="menuTitle"  type="submit">Create Menu</button>
        </form> )}

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