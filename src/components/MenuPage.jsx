import React, {useState} from 'react';
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';

const pastelColors = {
  pink:   '#f2d3de',
  green:  '#d3f2d8',
  yellow: '#f5f2c8',
  blue:   '#c8dff5',
};

const hotDrinks = [
    {name: "hot latte", price: 5, src: "/img/latte.png"},
    {name: "oat cappuchino", price: 6, src: "/img/matchalatte.png"}
];

const coldDrinks = [
    {name: "Iced latte", price: 5, src: "/img/latte.png"},
    {name: "Matcha latte", price: 6, src: "/img/matchalatte.png"}
];

const foodItems = [
    {name: "Chocolate muffin", price: 3, src: "/img/muffin.png"}
];

const sections = [
    {name:"Hot Drinks", items: hotDrinks},
    {name:"Cold Drinks", items: coldDrinks},
    {name:"Food", items: foodItems}
];

// add a "editable" prop so that the menu will display with or without add buttons based on whether menu is editable or not
// menu is editable if you are working on it in menu builder page
// menu is not editable if opened by a staff using the 5-digit code (where the menu shows up so that the staff can look at it and give feedback)

export default function MenuPage(props) {
    const [menuColor, setMenuColor] = useState(null);
    
    const sectionArray = sections.map((section) => {
        return <MenuSection section={section} key={section.name} />;
    });

    return (
    <> 
        <MenuBanner />
        <div className="menu-editor-layout">
            <CustomizeMenu />

            <div className="menu">
                <div className="menu-container">

                    {sectionArray}

                    <div className="add">
                        <div className="add-section">
                            <button className="circle-plus-btn" aria-label="Add section">+</button>
                            <h2>Add Section</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

function MenuSection ( props ) {
    const section = props.section;

    const itemArray = section.items.map((item) => {
        return <MenuItem item={item} key={item.name} />;
    });

    return (
        <div className="menu-section-preview">
            <h3 className="menu-section-title">{section.name}</h3>
            {itemArray}
            <div className="add-item">
                <button className="small circle-plus-btn" aria-label="add-item-btn">+</button>
                <label>Add Item</label>
            </div>
        </div>
    );
}

function MenuItem ( props ) {
    const item = props.item;

    return (
        <div className="menu-item-row">
            <p className="menu-item-name">{item.name}</p>
            <p className="menu-item-price">{"Price: $" + item.price}</p>
            <img src={item.src}/>
        </div>
    );
}