import tick from "../asset/tick.png";
import not_tick from "../asset/not_tick.png";
import delete_icon from "../asset/delete.png";
import { useState } from "react";

type TodoProp = {
  text: string;
  id: number;
  isComplete: boolean;
  handleDelete: (id: number) => void;
  handleToggle: (id: number) => void;
  handleEdit: (id: number, newText: string) => void;
};

function TodoList({
  text,
  id,
  isComplete,
  handleDelete,
  handleToggle,
  handleEdit,
}: TodoProp): JSX.Element {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      handleEdit(id, editText.trim()); // Pass the edited text back to the parent
      setEditing(false); // Exit edit mode
    }
  };
  return (
    <div className="list-container">
      <div
        className={`left-section ${isComplete && !editing ? "complete" : ""}`}
        onClick={() => {
          if (!editing) {
            handleToggle(id);
          }
        }}
      >
        <img src={isComplete && !editing ? tick : not_tick} alt="tick-icon" />
        {editing ? (
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit} // Save when focus is lost
          />
        ) : (
          <p>{text}</p>
        )}
      </div>

      <div className="right-section">
        <button
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur
          className="edit-btn"
          onClick={() => {
            handleSaveEdit();
            setEditing(!editing);
          }}
        >
          {editing ? "Done" : "Edit"}
        </button>

        <img
          src={delete_icon}
          alt="delete-icon"
          className="delete-icon"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
}

export default TodoList;
