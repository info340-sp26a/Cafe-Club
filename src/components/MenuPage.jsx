import React, {useState} from 'react';
import {MenuBanner} from './MenuBanner';
import { CustomizeMenu } from './CustomizeMenu';

export default function MenuPage(props) {
  return (
    <> 
        <MenuBanner />

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
    </>
  );
}