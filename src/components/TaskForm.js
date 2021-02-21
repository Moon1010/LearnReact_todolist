import React, { useState, useEffect } from "react";

const TaskForm = (props) => {
  const [allState, setAllState] = useState({
    id: "",
    name: "",
    status: false,
  });

  const onChangeForm = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    if (name === "status") {
      if (target.value === "true") value = true;
      else value = false;
    }
    setAllState({ ...allState, [name]: value });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    props.onSubmit(allState);
    onClear();
    props.onCloseForm();
  };

  const onClear = (event) => {
    // event.preventDefault();
    setAllState({
      id: "",
      name: "",
      status: false,
    });
  };

  useEffect(() => {
    if (Object.keys(props.task).length) {
      setAllState(props.task);
    }
    console.log(allState);
  }, [props.task]);

  return (
    <div className="panel panel-warning">
      <div className="panel-heading">
        <h3 className="panel-title">
          {props.task.id ? "Cập nhật công việc" : "Thêm Công Việc"}
          <span
            className="fa fa-times-circle text-right"
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => props.onCloseForm()}
          ></span>
        </h3>
      </div>
      <div className="panel-body">
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>Tên :</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={props.task.id ? allState.name : ""}
              onChange={onChangeForm}
            />
          </div>
          <label>Trạng Thái :</label>
          <select
            className="form-control"
            required="required"
            name="status"
            value={props.task.id ? allState.status : false}
            onChange={onChangeForm}
          >
            <option value={true}>Kích Hoạt</option>
            <option value={false}>Ẩn</option>
          </select>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Thêm
            </button>
            &nbsp;
            <button type="submit" className="btn btn-danger" onClick={onClear}>
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
