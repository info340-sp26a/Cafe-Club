import React, {useState} from 'react';
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';

const pastelColors = {
  pink:   '#f2d3de',
  green:  '#d3f2d8',
  yellow: '#f5f2c8',
  blue:   '#c8dff5',
};

export default function MenuPage(props) {
  const [menuColor, setMenuColor] = useState(null);
  
    return (
    <> 
        <MenuBanner />
        <div className="menu-editor-layout">
        <CustomizeMenu />

        <div className="menu">
            <div className="menu-container">
                <div className="add">
                    <div className="add-section">
                        <button className="circle-plus-btn" aria-label="add-section-btn">+</button>
                        <p>Add Section</p>
                    </div>

                    <div className="add-item">
                        <button className="small circle-plus-btn" aria-label="add-item-btn">+</button>
                        <p>Add Item</p>
                    </div>
                </div>
            </div>

            <div className="add-page">
                <button className="circle-plus-btn" aria-label="add-page-btn">+</button>
                <p>Add Page</p>
            </div>
        </div>
        </div>
    </>
  );
}