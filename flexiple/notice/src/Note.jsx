import React, { useState } from "react";

const Note = ({
  note,
  ind,
  removeNotes,
  updateNotes,
  pinNote,
  onDragEnd,
  onDragStart,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => {
    if (!isEditing) {
      setEditing(true);
      setEditedText(note.text);
    }
  };

  const handleSave = (ind, editedText) => {
    setEditing(false);

    updateNotes(ind, editedText);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <div
      className={`note ${note.isPinned ? "pinned" : ""}`}
      style={{
        position: "fixed",
        left: note.x + "px",
        top: note.y + "px",
        zIndex: note.isPinned ? 1 : 0,
      }}
      draggable={!note.isPinned}
      onDragStart={(e) => onDragStart(e, ind)}
      onDragEnd={(e) => onDragEnd(e, ind)}
    >
      <div className="note-header">
        <button onClick={() => removeNotes(ind)}>x</button>
        <button onClick={() => pinNote(ind)}>Pin</button>
      </div>
      <div className="note-content" onClick={handleEdit}>
        {isEditing ? (
          <textarea
            type="text"
            value={editedText}
            onChange={handleInputChange}
            onBlur={() => handleSave(ind, editedText)}
            autoFocus
          />
        ) : (
          <span>{note.text}</span>
        )}
      </div>
        <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Note;
