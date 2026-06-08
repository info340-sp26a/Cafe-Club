import HomeTitle from "./HomeTitle";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import MenuThumbnail from "./MenuThumbnail";





// const userMenus = [
//   { src: "/img/menu1.png", alt:"a picture of the menu"},
//   { src: "/img/menu2.png", alt:"a picture of the menu"},
//   { src: "/img/menu3.png", alt:"a picture of the menu"},
//   { src: "/img/menu4.png", alt:"a picture of the menu"},
// ];

// const templates = [
//   { src: "/img/template1.png", alt:"a picture of the menu templates"},
//   { src: "/img/template2.png", alt:"a picture of the menu templates"},
//   { src: "/img/template3.png", alt:"a picture of the menu templates"},
//   { src: "/img/template4.png", alt:"a picture of the menu templates"}

// ];

// const recentlyViewed = [

//   { src: "/img/menu1.png", alt:"a picture of the menu"},
//   { src: "/img/menu2.png", alt:"a picture of the menu"},
//   { src: "/img/menu3.png", alt:"a picture of the menu"},
// ]

// function MenuImageList( {items} ) {

//   const menuImage = items.map((menu,index) =>
//   {
//     return (
//           <Link to="/menu" key={index}>
//           <img className="menu-link menu"
//           src={menu.src}
//           alt={menu.alt} />
//         </Link>

//     );
//   });
//   return(
//     <>
//     {menuImage}
//     </>
//   );
// }

export default function HomePage() {

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


  function handleAccessSubmit(event){
  event.preventDefault();

  const db = getDatabase();
  
  const menuRef = ref(db, "menus");

  onValue(menuRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      alert("No Menu found!");
      return /*RETURN A DIV*/;
    }
        const menuId = Object.keys(data).find((key) => {
      return data[key].accessCode === accessCode.trim().toUpperCase();
    });

    if (menuId) {
      navigate(`/staff/${menuId}`);
    } else {
      alert("Invalid access code.");
    }
  }, {
    onlyOnce: true
  });
}

const userMenuLinks = userMenu.map((menu) => {
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

        <div className="flex-container">
          <div className="menu-card-wrapper">
          <span className="menu-card-title">New Menu</span>
          <Link to="/menu" className="menu-link menu-add-btn" aria-label="Create a new menu">+</Link>
        </div>
          {userMenuLinks}

        </div>
        
      </section>

      <div className="divider"></div>

      {/* <section>
        <h2 className="subheader">Templates</h2>

        <div className="flex-container">
          <MenuImageList items={templates} />
        </div>
        
      </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Recently Viewed:</h2>

        <div className="flex-container">
          <MenuImageList items={recentlyViewed}/>
        </div>
        

      </section>

      <div className="divider"></div> */}

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
        </form>
      </section>
    </main>
  );
}