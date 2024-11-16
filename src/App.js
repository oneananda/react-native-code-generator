import React, { useState } from 'react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    const offset = Math.random() * 200; // Example for random positioning
    setDroppedItems((prev) => [
      ...prev,
      { ...item, top: offset, left: offset },
    ]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Native Code Generator</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <DraggableElement name="Button" />
        <DraggableElement name="Text Box" />
      </div>
      <DropZone onDrop={handleDrop} droppedItems={droppedItems} />
    </div>
  );
};

export default App;
