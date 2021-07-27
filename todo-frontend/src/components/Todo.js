import React from "react";

export default function Todo({ completion, body, id }) {
  return (
    <li class="list-group-item">
      {body}

      <button type="button" class="btn btn-danger deletetodo">
        <span class="fas fa-trash" aria-hidden="true"></span>
      </button>
      <button type="button" class="btn btn-light edittodo">
        <span class="fas fa-pencil-alt" aria-hidden="true"></span>
      </button>
    </li>
  );
}
