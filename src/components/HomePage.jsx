import HomeTitle from "./HomeTitle";
import { Link } from "react-router";


const userMenus = [
  { src: "/img/menu1.png", alt:"a picture of the menu"},
  { src: "/img/menu2.png", alt:"a picture of the menu"},
  { src: "/img/menu3.png", alt:"a picture of the menu"},
  { src: "/img/menu4.png", alt:"a picture of the menu"},
];

const templates = [
  { src: "/img/template1.png", alt:"a picture of the menu templates"},
  { src: "/img/template2.png", alt:"a picture of the menu templates"},
  { src: "/img/template3.png", alt:"a picture of the menu templates"},
  { src: "/img/template4.png", alt:"a picture of the menu templates"}

];

const recentlyViewed = [

  { src: "/img/menu1.png", alt:"a picture of the menu"},
  { src: "/img/menu2.png", alt:"a picture of the menu"},
  { src: "/img/menu3.png", alt:"a picture of the menu"},
]

function MenuImageList( {items} ) {

  return(
    <div className="flex-container">
      {items.map((menu,index) => (
        <a href="/menu" key={index}>
          <img className="menu-link menu"
          src={menu.src}
          alt={menu.alt}
        />
        </a>
      ))}
    </div>
  );
}


export default function HomePage() {
  return (
    <main>
      <div className="home-page-Title">
      <HomeTitle />
      </div>
      <section>
        <h2>Your Menus:</h2>

        <div className="flex-container">
          <Link to="/MenuPage" className="menu-link menu-add-btn" aria-label="Create a new menu">+</Link>

          {userMenus.map((menu,index) => ( 
            <a href="/menu" key={index}>
              <img className="menu-link menu"
              src={menu.src}
              alt={menu.alt}
              />

            </a>
          ))}
          </div>
          </section>

      <div className="divider">

      </div>

      <section>
        <h2 className="subheader">Templates</h2>

        <MenuImageList items={templates} />
        </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Recently Viewed:</h2>

        <MenuImageList items={recentlyViewed}/>

        </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Staff View</h2>

        <form className="access-form">
          <label htmlFor="access-code" className="access">
            Please enter access code:
          </label>

          <input
            type="text"
            id="access-code"
            name="access-code"
            placeholder="Access code"
            required
          />

          <button type="submit">Enter</button>
        </form>
      </section>
    </main>
  );
}