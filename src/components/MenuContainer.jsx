import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import Alert from 'react-bootstrap/Alert';


export default function MenuContainer(props) {
    const menuId = props.menuId;

    const [sections, setSections] = useState([]);
    const [addingSectionName, setAddingSectionName] = useState("");
    const [showSectionForm, setShowSectionForm] = useState(false);

    useEffect(() => {
        if (!menuId) return;

        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const db = getDatabase();
        const sectionsRef = ref(db, `menus/${menuId}/sections`);

        const unsubscribe = onValue(sectionsRef, (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                setSections([]);
                return;
            }

            const sectionsArray = Object.keys(data).map((sectionId) => {
                const section = data[sectionId];
                const items = section.items
                    ? Object.keys(section.items).map((itemId) => ({
                          id: itemId,
                          ...section.items[itemId],
                      }))
                    : [];
                return { id: sectionId, name: section.name, items };
            });

            setSections(sectionsArray);
        });

        return () => unsubscribe();
    }, [menuId]);

    function handleAddSection(event) {
        event.preventDefault();

        if (addingSectionName.trim() === "") {
            alert("Please enter a section name!");
            return;
        }

        const db = getDatabase();
        push(ref(db, `menus/${menuId}/sections`), { name: addingSectionName });

        setAddingSectionName("");
        setShowSectionForm(false);
    }

    function handleDeleteSection(sectionId) {
        const db = getDatabase();
        remove(ref(db, `menus/${menuId}/sections/${sectionId}`));
    }

    const bgColor = props.bgColors?.[props.menuColor] || "";
    const fontColor = props.fontColors?.[props.menuColor] || "";

    const sectionArray = sections.map((section) => (
        <MenuSection
            section={section}
            menuId={menuId}
            key={section.id}
            onDeleteSection={handleDeleteSection}
            bgColor={bgColor}
            fontColor={fontColor}
        />
    ));

    return (
        <div className="menu">
            <div className="menu-container">

                {sectionArray}

                <div className="add">
                    {!showSectionForm && (
                        <div className="add-section">
                            <button
                                className="circle-plus-btn"
                                aria-label="Add section"
                                onClick={() => setShowSectionForm(true)}
                            >
                                +
                            </button>
                            <h2>Add Section</h2>
                        </div>
                    )}

                    {showSectionForm && (
                        <form onSubmit={handleAddSection}>
                            <label className="menuTitle" htmlFor="sectionName">
                                Section Name:
                            </label>
                            <input
                                className="menuTitle"
                                id="sectionName"
                                type="text"
                                value={addingSectionName}
                                onChange={(e) => setAddingSectionName(e.target.value)}
                                placeholder="e.g. Hot Drinks"
                                autoFocus
                                required
                            />
                            <button className="menuTitle" type="submit">
                                Save Section
                            </button>
                            <button
                                className="menuTitle"
                                type="button"
                                onClick={() => {
                                    setShowSectionForm(false);
                                    setAddingSectionName("");
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}


function MenuSection(props) {
    const { section, menuId, onDeleteSection, bgColor, fontColor } = props;

    const [inProgress, setInProgress] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function addItem(event) {
        event.preventDefault();

        if (itemName.trim() === "") {
            alert("Please enter an item name!");
            return;
        }

        const newItem = {
            name: itemName,
            price: parseFloat(itemPrice),
        };

        const db = getDatabase();
        push(ref(db, `menus/${menuId}/sections/${section.id}/items`), newItem);

        setItemName("");
        setItemPrice("");
        setInProgress(false);
    }

    function handleDeleteItem(itemId) {
        const db = getDatabase();
        remove(ref(db, `menus/${menuId}/sections/${section.id}/items/${itemId}`));
    }

    const itemArray = section.items.map((item) => (
        <MenuItem item={item} key={item.id} onDeleteItem={handleDeleteItem} />
    ));

    return (
        <div className="menu-section-preview" style={{ backgroundColor: bgColor || "", color: fontColor || "" }}>
            <div className="menu-section-header">
                <h3 className="menu-section-title">{section.name}</h3>
                <button
                    className="delete-section-btn"
                    aria-label="Delete section"
                    onClick={() => setShowDeleteConfirm(true)}
                >
                    Delete Section
                </button>
            </div>

            {showDeleteConfirm && (
                <Alert variant="warning" dismissible onClose={() => setShowDeleteConfirm(false)}>
                    <p>Are you sure you want to delete "{section.name}" and all its items?</p>
                    <button type="button" onClick={() => onDeleteSection(section.id)}>
                        Yes, delete
                    </button>
                    <button type="button" onClick={() => setShowDeleteConfirm(false)}>
                        Cancel
                    </button>
                </Alert>
            )}

            {itemArray}

            {!inProgress && (
                <div className="add-item">
                    <button
                        className="small circle-plus-btn"
                        aria-label="add-item-btn"
                        onClick={() => setInProgress(true)}
                    >
                        +
                    </button>
                    <label>Add Item</label>
                </div>
            )}

            {inProgress && (
                <form onSubmit={addItem}>
                    <label className="menuTitle" htmlFor={`itemName-${section.id}`}>
                        Item Name:
                    </label>
                    <input
                        className="menuTitle"
                        id={`itemName-${section.id}`}
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Enter item name"
                        autoFocus
                        required
                    />

                    <label className="menuTitle" htmlFor={`itemPrice-${section.id}`}>
                        Item Price:
                    </label>
                    <input
                        className="menuTitle"
                        id={`itemPrice-${section.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        placeholder="Enter item price"
                        required
                    />

                    <button className="menuTitle" type="submit">
                        Save Item
                    </button>
                    <button
                        className="menuTitle"
                        type="button"
                        onClick={() => {
                            setInProgress(false);
                            setItemName("");
                            setItemPrice("");
                        }}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}


function MenuItem(props) {
    const { item, onDeleteItem } = props;

    return (
        <div className="menu-item-row">
            <p className="menu-item-name">{item.name}</p>
            <p className="menu-item-price">{"Price: $" + item.price}</p>
            <button
                className="delete-item-btn"
                aria-label="Delete item"
                onClick={() => onDeleteItem(item.id)}
            >
                <img className="buttons-icon" src='/img/trash.png' alt="pixel trash can icon"/>
            </button>
        </div>
    );
}