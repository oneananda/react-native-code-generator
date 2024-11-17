import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop, droppedItems, updateItemStyle }) => {
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

  const handleStyleChange = (index, key, value) => {
    updateItemStyle(index, key, value);
  };

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
            ...item.style,
          }}
        >
          {item.name}
          <div style={{ marginTop: '5px' }}>
            <label>
              Font Size:
              <input
                type="number"
                value={item.style.fontSize || 14}
                onChange={(e) =>
                  handleStyleChange(index, 'fontSize', `${e.target.value}px`)
                }
                style={{ width: '60px', marginLeft: '5px' }}
              />
            </label>
            <label style={{ marginLeft: '10px' }}>
              Color:
              <input
                type="color"
                value={item.style.color || '#000000'}
                onChange={(e) =>
                  handleStyleChange(index, 'color', e.target.value)
                }
                style={{ marginLeft: '5px' }}
              />
            </label>
          </div>
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
