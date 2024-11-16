import React, { useState } from 'react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item, offset) => {
    const canvasRect = document
      .querySelector('div[style*="border: 2px dashed"]')
      .getBoundingClientRect();
    setDroppedItems((prev) => [
      ...prev,
      {
        ...item,
        top: offset.y - canvasRect.top,
        left: offset.x - canvasRect.left,
      },
    ]);
  };

  const generateCode = () => {
    return `
      import React from 'react';
      import { View, ${droppedItems.map(
        (item) => item.name.replace(' ', '')
      )} } from 'react-native';

      const App = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          ${droppedItems
            .map((item) => {
              if (item.name === 'Button') {
                return `<Button title="Click Me" onPress={() => alert('Clicked!')} />`;
              } else if (item.name === 'Text Box') {
                return `<View><Text>Sample Text</Text></View>`;
              }
              return `<${item.name.replace(' ', '')} />`;
            })
            .join('\n')}
        </View>
      );

      export default App;
    `;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Native Code Generator</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <DraggableElement name="Button" />
        <DraggableElement name="Text Box" />
      </div>
      <DropZone onDrop={handleDrop} droppedItems={droppedItems} />
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
