import React from "react";
import { deleteTodo, editTodo } from "../APIFunctions";
import Cookies from "universal-cookie";

export default function Todo({ completion, body, id }) {
  const cookies = new Cookies();

  const handleUpdate = async () => {
    let updateText = prompt(
      "What would you like to update this todo to?",
      "Updated Text"
    );
    if (updateText == null || updateText == "") {
      alert("Need to specify updated message");
    } else {
      const res = await editTodo(cookies.get("token"), id, updateText);
      if ((await res) == true) {
        window.location.reload();
      } else {
        alert("Could not update this todo");
      }
    }
  };

  const handleDelete = async () => {
    const res = await deleteTodo(cookies.get("token"), id);
    if ((await res) == true) {
      window.location.reload();
    } else {
      alert("Could not delete this todo");
    }
  };

  return (
    <li class="list-group-item">
      {body}

      <button
        type="button"
        class="btn btn-danger deletetodo"
        onClick={handleDelete}
      >
        <span class="fas fa-trash" aria-hidden="true"></span>
      </button>
      <button
        type="button"
        class="btn btn-light edittodo"
        onClick={handleUpdate}
      >
        <span class="fas fa-pencil-alt" aria-hidden="true"></span>
      </button>
    </li>
  );
}
