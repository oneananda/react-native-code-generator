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
      const isExisting = prev.some((existingItem) => existingItem.id === item.id);

      if (isExisting) {
        return prev;
      }

      return [
        ...prev,
        {
          ...item,
          id: item.id || uuidv4(),
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
          ? { ...item, left: Math.max(0, left), top: Math.max(0, top) }
          : item
      )
    );
  };

  const generateCode = () => {
    const components = droppedItems.map((item) => {
      if (item.name === 'Button') {
        return `<Button title="Click Me" onPress={() => alert('Button Clicked!')} style={{ position: 'absolute', top: ${item.top}, left: ${item.left} }} />`;
      } else if (item.name === 'Text Box') {
        return `<Text style={{ position: 'absolute', top: ${item.top}, left: ${item.left} }}>Sample Text</Text>`;
      }
      return null;
    });

    return `
import React from 'react';
import { View, Button, Text } from 'react-native';

const GeneratedApp = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      ${components.join('\n')}
    </View>
  );
};

export default GeneratedApp;
    `;
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
          {generateCode()}
        </pre>
      </div>
    </div>
  );
};

export default App;
