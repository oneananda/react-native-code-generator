import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ name }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { name },
  }));

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
      {name}
    </div>
  );
};

export default DraggableElement;
