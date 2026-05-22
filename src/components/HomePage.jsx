import HomeTitle from "./HomeTitle";

export default function HomePage() {
  return (
    <main>
      <HomeTitle />
      <section>
        <h2>Your Menus:</h2>

        <div className="flex-container">
          <a className="menu-link menu" href="/menu">+</a>

          <a href="/menu">
            <img className="menu-link menu" src="/img/menu1.png" alt="A picture of a menu" />
          </a>

          <a href="/menu">
            <img className="menu-link menu" src="/img/menu2.png" alt="A picture of a menu" />
          </a>

          <a href="/menu">
            <img className="menu-link menu" src="/img/menu3.png" alt="A picture of a menu" />
          </a>

          <a href="/menu">
            <img className="menu-link menu" src="/img/menu4.png" alt="A picture of a menu" />
          </a>
        </div>
      </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Templates</h2>

        <div className="flex-container">
          <a href="/menu">
            <img className="menu-link menu" src="/img/template1.png" alt="A picture of a menu template" />
          </a>
          <a href="/menu">
            <img className="menu-link menu" src="/img/template2.png" alt="A picture of a menu template" />
          </a>
          <a href="/menu">
            <img className="menu-link menu" src="/img/template3.png" alt="A picture of a menu template" />
          </a>
          <a href="/menu">
            <img className="menu-link menu" src="/img/template4.png" alt="A picture of a menu template" />
          </a>
        </div>
      </section>

      <div className="divider"></div>

      <section>
        <h2 className="subheader">Recently Viewed:</h2>

        <div className="flex-container">
          <a href="/menu">
            <img className="menu-link menu" src="/img/menu1.png" alt="A picture of a menu" />
          </a>
          <a href="/menu">
            <img className="menu-link menu" src="/img/menu3.png" alt="A picture of a menu" />
          </a>
          <a href="/menu">
            <img className="menu-link menu" src="/img/menu2.png" alt="A picture of a menu" />
          </a>
        </div>
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