import React, {useState} from 'react';
import {MenuBanner} from './MenuBanner';
import { CustomizeMenu } from './CustomizeMenu';

export default function MenuPage(props) {
  return (
    <> 
        {MenuBanner}

        {CustomizeMenu}

        <div class="menu">
            <div class="menu-container">
                <div class="add">
                    <div class="add-section">
                        <button class="circle-plus-btn" aria-label="add-section-btn">+</button>
                        <p>Add Section</p>
                    </div>

                    <div class="add-item">
                        <button class="small circle-plus-btn" aria-label="add-item-btn">+</button>
                        <p>Add Item</p>
                    </div>
                </div>
            </div>

            <div class="add-page">
                <button class="circle-plus-btn" aria-label="add-page-btn">+</button>
                <p>Add Page</p>
            </div>
        </div>
    </>
  );
}