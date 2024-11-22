import React, { useState, useEffect } from 'react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [droppedItems, setDroppedItems] = useState([]);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const getId = () => 'unikid' + uuidv4().replace(/-/g, '').slice(0, 10);

    const pushToUndoStack = (state) => {
        setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(state))]);
        setRedoStack([]);
    };

    const handleDrop = (item, offset) => {
        const canvasRect = document
            .querySelector('div[style*="border: 2px dashed"]')
            .getBoundingClientRect();

        pushToUndoStack(droppedItems);

        setDroppedItems((prev) => [
            ...prev,
            {
                ...item,
                id: getId(), // Always generate a unique ID for each drop
                top: offset.y - canvasRect.top,
                left: offset.x - canvasRect.left,
                style: { color: '#000000', backgroundColor: '#ffffff' },
            },
        ]);
    };


    const updateItemPosition = (id, left, top) => {
        console.log(`Updating position: ID=${id}, Left=${left}, Top=${top}`);
        if (!id || typeof left !== 'number' || typeof top !== 'number') return;

        setDroppedItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, left: Math.max(0, left), top: Math.max(0, top) }
                    : item
            )
        );
    };

    const updateItemStyle = (id, key, value) => {
        pushToUndoStack(droppedItems);
        setDroppedItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, style: { ...item.style, [key]: value } }
                    : item
            )
        );
    };

    const undoLastAction = () => {
        if (undoStack.length > 0) {
            const previousState = undoStack[undoStack.length - 1];
            setRedoStack((prev) => [JSON.parse(JSON.stringify(droppedItems)), ...prev]);
            setDroppedItems([...previousState]);
            setUndoStack((prev) => prev.slice(0, -1));
        }
    };

    const redoLastAction = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack[0];
            pushToUndoStack(droppedItems);
            setDroppedItems([...nextState]);
            setRedoStack((prev) => prev.slice(1));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                e.preventDefault();
                undoLastAction();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                e.preventDefault();
                redoLastAction();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [undoStack, redoStack, droppedItems]);

    const selectedItem = droppedItems.find((item) => item.id === selectedItemId);

    return (
        <div style={{ display: 'flex', padding: '20px', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 3 }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <DraggableElement name="Button" />
                        <DraggableElement name="Text Box" />
                    </div>
                    <DropZone
                        droppedItems={droppedItems}
                        updateItemPosition={updateItemPosition}
                        onDrop={handleDrop}
                        onSelectItem={setSelectedItemId}
                        pushToUndoStack={pushToUndoStack}
                    />
                    <button onClick={undoLastAction} style={{ marginTop: '10px' }}>
                        Undo
                    </button>
                    <button onClick={redoLastAction} style={{ marginTop: '10px', marginLeft: '10px' }}>
                        Redo
                    </button>
                </div>
                <div style={{ flex: 1, marginLeft: '20px', padding: '10px', border: '1px solid #ddd' }}>
                    <h3>Properties</h3>
                    {selectedItem ? (
                        <div>
                            <p><strong>ID:</strong> {selectedItem.id}</p>
                            <p><strong>Type:</strong> {selectedItem.name}</p>
                            <div>
                                <label>
                                    Color:
                                    <input
                                        type="color"
                                        value={selectedItem.style.color}
                                        onChange={(e) => updateItemStyle(selectedItem.id, 'color', e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Background Color:
                                    <input
                                        type="color"
                                        value={selectedItem.style.backgroundColor}
                                        onChange={(e) =>
                                            updateItemStyle(selectedItem.id, 'backgroundColor', e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    ) : (
                        <p>Select an item to see its properties.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
