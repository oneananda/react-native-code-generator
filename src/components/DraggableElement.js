import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ name }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        border: '1px solid #ccc',
        margin: '4px',
        backgroundColor: 'white',
      }}
    >
      {name}
    </div>
  );
};

export default DraggableElement;
