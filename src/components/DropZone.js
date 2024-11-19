import React from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

// Component for each dropped item
const DroppedItem = ({ item, updateItemPosition }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: item.id }, // Pass the unique ID
  }));

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
      {item.name} (ID: {item.id})
    </div>
  );
};

// Main DropZone
const DropZone = ({ droppedItems, updateItemPosition, onDrop }) => {
  const [, dropRef] = useDrop(() => ({
    accept: 'ELEMENT',
    hover: (draggedItem, monitor) => {
      const canvasRect = document
        .querySelector('div[style*="border: 2px dashed"]')
        .getBoundingClientRect();
      const offset = monitor.getClientOffset();

      if (!offset) return;

      const newLeft = offset.x - canvasRect.left;
      const newTop = offset.y - canvasRect.top;

      // Update position using the unique ID
      updateItemPosition(draggedItem.id, newLeft, newTop);
    },
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        const offset = monitor.getClientOffset();
        onDrop(item, offset);
      }
    },
  }));

  return (
    <div
      ref={dropRef}
      style={{
        width: '100%',
        height: '400px',
        border: '2px dashed #ccc',
        marginTop: '20px',
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      {droppedItems.map((item) => (
        <DroppedItem
          key={item.id} // Use unique ID as key
          item={item}
          updateItemPosition={updateItemPosition}
        />
      ))}
      {!droppedItems.length && (
        <p style={{ textAlign: 'center', color: '#aaa' }}>
          Drag elements here to create your layout.
        </p>
      )}
    </div>
  );
};

export default DropZone;
