import React from "react";
const TaskForm = (props) => {
  return (
    <div className="panel panel-warning">
      <div className="panel-heading">
        <h3 className="panel-title">
          Thêm Công Việc
          <span
            className="fa fa-times-circle text-right"
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => props.onCloseForm()}
          ></span>
        </h3>
      </div>
      <div className="panel-body">
        <form>
          <div className="form-group">
            <label>Tên :</label>
            <input type="text" className="form-control" />
          </div>
          <label>Trạng Thái :</label>
          <select className="form-control" required="required">
            <option value="1">Kích Hoạt</option>
            <option value="0">Ẩn</option>
          </select>
          <br />
          <div className="text-center">
            <button type="submit" className="btn btn-warning">
              Thêm
            </button>
            &nbsp;
            <button type="submit" className="btn btn-danger">
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
