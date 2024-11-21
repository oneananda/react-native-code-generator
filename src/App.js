import React, { useState, useEffect } from 'react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [history, setHistory] = useState([]); // History stack for Undo
  const [selectedItemId, setSelectedItemId] = useState(null);

  const getId = () => 'unikid' + uuidv4().replace(/-/g, '').slice(0, 10);

  // Save the current state to history
  const saveToHistory = () => {
    setHistory((prev) => [...prev, droppedItems]);
  };

  const handleDrop = (item, offset) => {
    saveToHistory(); // Save the current state before making changes

    const canvasRect = document
      .querySelector('div[style*="border: 2px dashed"]')
      .getBoundingClientRect();

    setDroppedItems((prev) => {
      const isExisting = prev.some((existingItem) => existingItem.id === item.id);

      if (isExisting) {
        return prev;
      }

      return [
        ...prev,
        {
          ...item,
          id: item.id || getId(),
          top: offset.y - canvasRect.top,
          left: offset.x - canvasRect.left,
          style: { color: '#000000', backgroundColor: '#ffffff' },
        },
      ];
    });
  };

  const updateItemPosition = (id, left, top) => {
    saveToHistory(); // Save state before updating position

    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, left: Math.max(0, left), top: Math.max(0, top) }
          : item
      )
    );
  };

  const updateItemStyle = (id, key, value) => {
    saveToHistory(); // Save state before updating styles

    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, style: { ...item.style, [key]: value } }
          : item
      )
    );
  };

  const handleUndo = () => {
    console.log("Ctrl+Z pressed!");
    console.log(history.length);
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1)); // Remove the last state from history
      setDroppedItems(previousState); // Revert to the previous state
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        handleUndo(); // Call undo when Ctrl + Z is pressed
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress); // Cleanup
  }, [history]);

  const selectedItem = droppedItems.find((item) => item.id === selectedItemId);

  return (
    <div style={{ display: 'flex', padding: '20px', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 3 }}>
          <h1>React Native Code Generator</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <DraggableElement name="Button" />
            <DraggableElement name="Text Box" />
          </div>
          <DropZone
            droppedItems={droppedItems}
            onDrop={handleDrop}
            updateItemPosition={updateItemPosition}
            onSelectItem={setSelectedItemId}
          />
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
      <div style={{ marginTop: '20px' }}>
        <h3>Generated Code:</h3>
        <pre
          style={{
            background: '#f5f5f5',
            padding: '10px',
            border: '1px solid #ddd',
            overflowX: 'auto',
          }}
        >
          {/* Display generated code here */}
        </pre>
      </div>
    </div>
  );
};

export default App;
