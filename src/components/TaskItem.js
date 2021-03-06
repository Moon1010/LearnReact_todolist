import React from "react";

const TaskItem = (props) => {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.task.name}</td>
      <td className="text-center">
        <span
          className={
            props.task.status === true
              ? "label label-danger"
              : "label label-success"
          }
          onClick={() => props.onUpdateStatus(props.task.id)}
          style={{ cursor: "pointer" }}
        >
          {props.task.status === true ? "Kích hoạt" : "Ẩn"}
        </span>
      </td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => props.onUpdate(props.task.id)}
        >
          <span className="fa fa-pencil mr-5"></span>Sửa
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.onDelete(props.task.id)}
        >
          <span className="fa fa-trash mr-5"></span>Xóa
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
