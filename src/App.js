import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

function App() {
  const [allState, setAllState] = useState([]);
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
    console.log(tasks);
    console.log(allState);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      setAllState(tasks);
    }
  }, []);

  return (
    <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <TaskForm />
        </div>
        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
          <button type="button" className="btn btn-primary">
            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
          </button>
          <button
            type="button"
            className="btn btn-warning ml-5"
            onClick={generateState}
          >
            Generate
          </button>
          <Control />
          <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
