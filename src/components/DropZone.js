import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, droppedItems }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDrop(item, offset);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      style={{
        width: '100%',
        height: '400px',
        border: '2px dashed #ccc',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        position: 'relative',
      }}
    >
      {droppedItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            padding: '8px',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
        >
          {item.name}
        </div>
      ))}
      {!droppedItems.length && (
        <p style={{ color: '#aaa', textAlign: 'center' }}>
          Drag elements here to create your layout.
        </p>
      )}
    </div>
  );
};

export default DropZone;
