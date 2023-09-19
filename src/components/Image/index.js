import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import "./styles.css"

function Image({ image }) {
  return (
    <Draggable draggableId={image.id.toString()} index={image.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="gallery-item"
        >
          <img src={image.src} alt={image.tag} />
          <p>{image.tag}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Image;