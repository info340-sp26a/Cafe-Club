import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import { getAuth } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';


import MenuContainer from './MenuContainer';
import { bgColors, fontColors } from './menuColors';

export default function MenuPage(props) {
    const navigate = useNavigate();

    const { menuId: urlMenuId } = useParams();
    const [menuId, setMenuId] = useState(null);
    const [menuTitle, setMenuTitle] = useState("");
    const [currentMenuTitle, setCurrentMenuTitle] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [alertMessage, setAlertMessage] = useState("");
    const [menuColor, setMenuColor] = useState("");
    
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
                setMenuColor(data.customization?.color || "");
            }
        });
        return () => unsubscribe(); 
    }, [urlMenuId]);


        async function handleDelete(menuId) {
            if (!menuId) {
                setAlertMessage("No menu selected.");
                return;
            }

            try {
                const db= getDatabase();
                await remove(ref(db, `menus/${menuId}`));
                setAlertMessage("Menu Deleted");
                setShowDeleteConfirm(false);
                setMenuId(null);
                navigate("/");
            }
                catch (err) {
                setAlertMessage("Unable to delete menu.");
            }
        }
    
              
        //     if (!menuId){
        //           return;
        //       }
      
        //       const confirmDelete = window.confirm("Are you sure you want to delete this?");
      
        //       if (!confirmDelete){
        //           return;
        //       }
      
        //       try{
      
        //           const db = getDatabase();
      
        //           await remove(ref(db, `menus/${menuId}`));
        //           setAlertMessage("menu deleted");
        //           navigate("/")
        //        }
        //           catch(err)  {
        //           console.error(err);
        //           setAlertMessage("failed to delete");
        //       }
        //   }   

    function createMenu(event){
        event.preventDefault();
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
            console.error("No user logged in");
            return;
        }

        if (menuTitle.trim() === "") {
        setAlertMessage("Please enter a menu title!");
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
       {menuId && <MenuBanner menuId={menuId}  onDelete={() => setShowDeleteConfirm(true)}/>}

        {showDeleteConfirm && (
        <Alert variant="warning" dismissible onClose={() => setShowDeleteConfirm(false)}>
         <p>Are you sure you want to delete this menu?</p>

         <button type="button" onClick={() => handleDelete(menuId)}>
         Yes, delete
        </button>

        <button type="button" onClick={() => setShowDeleteConfirm(false)}>
        Cancel
        </button>
        </Alert>
        )}
       
       {!menuId && ( <form onSubmit={createMenu}>
          <label className="menuTitle" htmlFor="menuTitle">Menu Title:</label>
          <input
           className="menuTitle"
           name="menuTitle"
            id="menuTitle"
            type="text"
            value={menuTitle}
            onChange={(event) => setMenuTitle(event.target.value)}
            placeholder="Enter menu title"
            required
          />
          <button className="menuTitle"  type="submit">Create Menu</button>
        {alertMessage && (<Alert variant="warning" dismissible onClose={() => setAlertMessage("")} > {alertMessage} </Alert>)}
        </form> )}


       {menuId && (
        <div className="menu-page-content">
          <h2 className="currMenuTitle">{currentMenuTitle}</h2>
          <div className="menu-editor-layout">
            <CustomizeMenu menuId={menuId}/>
            <MenuContainer menuId={menuId} menuColor={menuColor} bgColors={bgColors} fontColors={fontColors} />
          </div>
        </div>
      )}
    </>
  );
}