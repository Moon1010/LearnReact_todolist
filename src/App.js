import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import TaskItem from "./components/TaskItem";

function App() {
  const [allState, setAllState] = useState([]);
  const [editState, setEditState] = useState({});
  const [filterState, setFilterState] = useState({
    name: "",
    status: -1,
  });
  const [keyWord, setKeyWord] = useState();

  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  const generateID = () => {
    return s4() + s4() + "-" + s4() + "-" + s4();
  };

  const generateState = () => {
    const tasks = [
      {
        id: generateID(),
        name: "Programing",
        status: true,
      },
      {
        id: generateID(),
        name: "Swimming",
        status: false,
      },
      {
        id: generateID(),
        name: "Learning",
        status: true,
      },
    ];
    setAllState(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      setAllState(tasks);
    }
  }, []);

  const onCloseForm = () => {
    setIsDisplayForm(false);
    setEditState({
      id: "",
      name: "",
      status: true,
    });
  };

  const onShowForm = () => {
    setIsDisplayForm(true);
  };

  const onSubmitForm = (data) => {
    const tasks = allState;

    if (data.id) {
      const index = findIndexState(data.id);
      tasks[index].name = data.name;
      tasks[index].status = data.status;
    } else {
      data.id = generateID();
      tasks.push(data);
    }
    setAllState(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const elmTaskForm = isDisplayForm ? (
    <TaskForm
      onCloseForm={onCloseForm}
      onSubmit={onSubmitForm}
      task={editState}
    />
  ) : (
    ""
  );

  const onToggleForm = () => {
    if (Object.keys(editState).length) {
    } else {
      setIsDisplayForm(!isDisplayForm);
    }
    setEditState({});
  };

  const onUpdateStatus = (id) => {
    let tasks = allState;
    let index = findIndexState(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      setAllState(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const findIndexState = (id) => {
    let result = -1;
    allState.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  const onDelete = (id) => {
    let tasks = allState;
    let index = findIndexState(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      setAllState(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    onCloseForm();
  };

  const onUpdate = (id) => {
    onShowForm();
    let tasks = allState;
    let index = findIndexState(id);
    let editTask = tasks[index];
    setEditState(editTask);
  };

  const onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    setFilterState({ name: filterName.toLowerCase(), status: filterStatus });
  };

  let tasks = allState;
  if (filterState) {
    if (filterState.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterState.name) !== -1;
      });
    }
    tasks = tasks.filter((task) => {
      if (filterState.status === -1) {
        return task;
      } else {
        return task.status === (filterState.status === 1 ? true : false);
      }
    });
  }

  const onSearch = (keyword) => {
    console.log(keyword);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div
          className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}
        >
          {elmTaskForm}
        </div>
        <div
          className={
            isDisplayForm
              ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
              : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
          }
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={onToggleForm}
          >
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>
          <button
            type="button"
            className="btn btn-warning ml-5"
            onClick={generateState}
          >
            Generate
          </button>
          <Control onSearch={onSearch} />
          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList
                tasks={tasks}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onFilter={onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
