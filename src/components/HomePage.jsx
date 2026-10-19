import HomeTitle from "./HomeTitle";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import MenuThumbnail from "./MenuThumbnail";
import Alert from 'react-bootstrap/Alert';


export default function HomePage() {

  const [searchTerm, setSearchTerm] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const [accessCode, setAccessCode] = useState("");
  const [userMenu, setUserMenu] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser){
      return;
    }

    const db = getDatabase();
    const menuRef = ref(db, "menus");
    
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setUserMenu([]);
        return;
      }


      const menuArray = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key]
        };
      })
      .filter((menu) => {
        return menu.ownerId === currentUser.uid;
      });
      setUserMenu(menuArray);
    });
    return () => unsubscribe();
  }, []);

const filteredMenus = userMenu.filter((menu) => {
  return menu.title.toLowerCase().includes(searchTerm.toLowerCase());
});

  async function handleAccessSubmit(event){
  event.preventDefault();

  const db = getDatabase();
  
  const menuRef = ref(db, "menus");

  const snapshot = await get(menuRef);
  const data = snapshot.val();


    if (!data) {
      setAlertMessage("No Menu found!");
      return /*RETURN A DIV*/;
    }
        const menuId = Object.keys(data).find((key) => {
      return data[key].accessCode === accessCode.trim().toUpperCase();
    });

    if (menuId) {
      navigate(`/staff/${menuId}`);
    } else {
      setAlertMessage("Invalid access code.");
    }

  }
const userMenuLinks = filteredMenus.map((menu) => {
  return (
      <div key={menu.id} className="menu-card-wrapper">
        <span className="menu-card-title">{menu.title}</span>
        <Link to={`/menu/${menu.id}`} className="menu-link menu-card">
          <MenuThumbnail menu={menu} />
        </Link>
      </div>
  );
});



  return (
    <main>
      <div className="home-page-Title">
      <HomeTitle />
      </div>
      <section>
        <h2>Your Menus:</h2>
        <input className = "search-bar" type="text" placeholder="Search for a menu" id="menu-search" name="menuSearch" value={searchTerm} 
        onChange={(event) => setSearchTerm(event.target.value)}/>
        <div className="flex-container">
          <div className="menu-card-wrapper">
          <span className="menu-card-title">New Menu</span>
          <Link to="/menu" className="menu-link menu-add-btn" aria-label="Create a new menu">+</Link>
        </div>
          {userMenuLinks}

        </div>
        
      </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Review a Menu</h2>

        <form className="access-form" onSubmit={handleAccessSubmit}>
          <label htmlFor="access-code" className="access">
            Have an access code? Review a menu and share feedback!
          </label>

          <input
            type="text"
            id="access-code"
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value.toUpperCase())}
            placeholder="Access code"
            required
          />

          <button type="submit">Enter</button>
          {alertMessage && (
        <Alert className='alert-message' variant="danger" dismissible onClose={() => setAlertMessage("")}> {alertMessage}
        </Alert>
      )}
        </form>
      </section>
    </main>
  );
}