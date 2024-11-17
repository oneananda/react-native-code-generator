import React from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

const DroppedItem = ({ item, index, updateItemPosition, updateItemStyle }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handlePositionChange = (key, value) => {
    updateItemPosition(index, key, value);
  };

  const handleStyleChange = (key, value) => {
    updateItemStyle(index, key, value);
  };

  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        top: item.top,
        left: item.left,
        padding: '8px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        cursor: 'move',
        ...item.style,
      }}
    >
      {item.name}
      <div style={{ marginTop: '5px' }}>
        <label>
          X:
          <input
            type="number"
            value={item.left || 0}
            onChange={(e) =>
              handlePositionChange('left', parseInt(e.target.value, 10))
            }
            style={{ width: '60px', marginLeft: '5px' }}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Y:
          <input
            type="number"
            value={item.top || 0}
            onChange={(e) =>
              handlePositionChange('top', parseInt(e.target.value, 10))
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
              handleStyleChange('color', e.target.value)
            }
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>
    </div>
  );
};

const DropZone = ({ onDrop, droppedItems, updateItemPosition, updateItemStyle }) => {
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
        <DroppedItem
          key={index}
          item={item}
          index={index}
          updateItemPosition={updateItemPosition}
          updateItemStyle={updateItemStyle}
        />
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
