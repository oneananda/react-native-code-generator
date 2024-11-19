import React from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

const DroppedItem = ({ item, updateItemPosition, onSelectItem }) => {
  const [, dragRef] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: item.id },
  }));

  const renderContent = () => {
    switch (item.name) {
      case 'Button':
        return <button style={{ padding: '8px', cursor: 'pointer', border: 'none' }}>Button</button>;
      case 'Text Box':
        return <input type="text" style={{ width: '100%', padding: '8px', border: 'none' }} placeholder="Enter text here" />;
      default:
        return <div style={{ border: 'none' }}>{item.name}</div>;
    }
  };
  
  return (
    <div
      ref={dragRef}
      onClick={() => onSelectItem(item.id)} // Select the item on click
      style={{
        position: 'absolute',
        top: item.top,
        left: item.left,
        padding: '8px',
        border: '1px solid #ddd',
        backgroundColor: item.style?.backgroundColor || 'white',
        color: item.style?.color || 'black',
        cursor: 'pointer',
        ...item.style,
      }}
    >
      {renderContent()}
    </div>
  );
};

const DropZone = ({ droppedItems, updateItemPosition, onDrop, onSelectItem }) => {
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
          key={item.id}
          item={item}
          updateItemPosition={updateItemPosition}
          onSelectItem={onSelectItem}
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
