import React, {useState} from 'react';
import MenuBanner from './MenuBanner';
import CustomizeMenu  from './CustomizeMenu';
import { getDatabase, ref, set } from 'firebase/database';

import MenuContainer from './MenuContainer';

const pastelColors = {
  pink:   '#f2d3de',
  green:  '#d3f2d8',
  yellow: '#f5f2c8',
  blue:   '#c8dff5',
};


export default function MenuPage(props) {
    const currentUser = props.currentUser;
    const db = getDatabase();
    const userRef = ref(db, currentUser);
    const personOfInterestRef = ref(db, "people/"+currentUser);
    const personOfInterestMenu = ref(db, "people/"+currentUser+"/menus");
  



    const [menuColor, setMenuColor] = useState(null);

    return (
    <> 
        <MenuBanner />
        <div className="menu-editor-layout">
            <CustomizeMenu />

            <MenuContainer />
        </div>
    </>
  );
}

