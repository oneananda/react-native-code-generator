import React, { useState } from 'react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item, offset) => {
    const canvasRect = document
      .querySelector('div[style*="border: 2px dashed"]')
      .getBoundingClientRect();

    setDroppedItems((prev) => {
      // Check if the item is already present by matching its ID
      const isExisting = prev.some((existingItem) => existingItem.id === item.id);

      if (isExisting) {
        return prev; // Do not add duplicates
      }

      // Add new item with a unique ID
      return [
        ...prev,
        {
          ...item,
          id: item.id || uuidv4(), // Generate a unique ID if it doesn't exist
          top: offset.y - canvasRect.top,
          left: offset.x - canvasRect.left,
          style: {},
        },
      ];
    });
  };

  const updateItemPosition = (id, left, top) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, left: Math.max(0, left), top: Math.max(0, top) } // Update position only for the matching ID
          : item
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Native Code Generator</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <DraggableElement name="Button" />
        <DraggableElement name="Text Box" />
      </div>
      <DropZone
        droppedItems={droppedItems}
        onDrop={handleDrop}
        updateItemPosition={updateItemPosition}
      />
    </div>
  );
};

export default App;
