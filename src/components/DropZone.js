import React from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

const DroppedItem = ({ item, updateItemPosition, onSelectItem, pushToUndoStack }) => {
    const [, dragRef] = useDrag(() => ({
        type: 'ELEMENT',
        item: { ...item },
    }));

    const renderContent = () => {
        switch (item.name) {
            case 'Button':
                return <button style={{ ...item.style }}>Button</button>;
            case 'Text Box':
                return <input type="text" style={{ ...item.style }} placeholder="Enter text here" />;
            default:
                return <div style={{ ...item.style }}>{item.name}</div>;
        }
    };

    return (
        <div
            ref={dragRef}
            onClick={() => onSelectItem(item.id)}
            style={{
                position: 'absolute',
                top: item.top ?? 0,
                left: item.left ?? 0,
                cursor: 'pointer',
                ...item.style,
            }}
        >
            {renderContent()}
        </div>
    );
};

const DropZone = ({ droppedItems, updateItemPosition, onDrop, onSelectItem, pushToUndoStack }) => {
    const [, dropRef] = useDrop(() => ({
        accept: 'ELEMENT',
        hover: (draggedItem, monitor) => {
            console.log('Dragged Item:', draggedItem);
            if (!draggedItem) return;

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
                    pushToUndoStack={() => pushToUndoStack(droppedItems)}
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
