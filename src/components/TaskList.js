import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
  const [allState, setAllState] = useState({
    filterName: "",
    filterStatus: -1,
  });
  const itemTasks = props.tasks.map((task, index) => {
    return (
      <TaskItem
        key={task.id}
        index={index}
        task={task}
        onUpdateStatus={props.onUpdateStatus}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
    );
  });

  const onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    props.onFilter(
      name === "filterName" ? value : allState.filterName,
      name === "filterStatus" ? value : allState.filterStatus
    );
    setAllState({ ...allState, [name]: value });
  };

  return (
    <table className="table table-bordered table-hover mt-15">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Tên</th>
          <th className="text-center">Trạng Thái</th>
          <th className="text-center">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              className="form-control"
              name="filterName"
              value={allState.filterName}
              onChange={onChange}
            />
          </td>
          <td>
            <select
              className="form-control"
              name="filterStatus"
              value={allState.filterStatus}
              onChange={onChange}
            >
              <option value="-1">Tất Cả</option>
              <option value="0">Ẩn</option>
              <option value="1">Kích Hoạt</option>
            </select>
          </td>
          <td></td>
        </tr>
        {itemTasks}
      </tbody>
    </table>
  );
};

export default TaskList;
