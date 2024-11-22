import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableElement = ({ name }) => {
    const [, dragRef] = useDrag(() => ({
        type: 'ELEMENT',
        item: { name }, // No ID here
    }));

    const renderElement = () => {
        switch (name) {
            case 'Button':
                return <button style={{ padding: '8px', border: '1px solid #ccc' }}>Button</button>;
            case 'Text Box':
                return <input type="text" style={{ padding: '8px', border: '1px solid #ccc' }} />;
            default:
                return <div>{name}</div>;
        }
    };

    return (
        <div
            ref={dragRef}
            style={{ margin: '4px', cursor: 'move', backgroundColor: 'white', display: 'inline-block' }}
        >
            {renderElement()}
        </div>
    );
};

export default DraggableElement;

