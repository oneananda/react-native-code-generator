import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ name }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { name },
  }));

  const renderElement = () => {
    switch (name) {
      case 'Button':
        return <button style={{ padding: '8px' }}>Button</button>;
      case 'Text Box':
        return <input type="text" style={{ padding: '8px', width: '100%' }} placeholder="Enter text here" />;
      default:
        return <div>{name}</div>;
    }
  };

  return (
    <div
      ref={dragRef}
      style={{
        padding: '8px',
        border: '1px solid #ccc',
        margin: '4px',
        backgroundColor: 'white',
        cursor: 'move',
      }}
    >
      {renderElement()}
    </div>
  );
};

export default DraggableElement;
