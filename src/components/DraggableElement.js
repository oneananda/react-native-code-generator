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
        return (
          <button
            style={{
              padding: '8px',
              border: '1px solid #ccc', // Add border here for the button
              backgroundColor: 'white',
            }}
          >
            Button
          </button>
        );
      case 'Text Box':
        return (
          <input
            type="text"
            style={{
              padding: '8px',
              width: '100%',
              border: '1px solid #ccc', // Add border here for the input
            }}
            placeholder="Enter text here"
          />
        );
      default:
        return <div>{name}</div>;
    }
  };

  return (
    <div
      ref={dragRef}
      style={{
        margin: '4px',
        cursor: 'move',
        backgroundColor: 'white',
        display: 'inline-block', // Prevent the parent div from expanding
      }}
    >
      {renderElement()}
    </div>
  );
};

export default DraggableElement;
