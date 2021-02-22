import React from "react";
import Search from "./Search";
import Sort from "./Sort";

const Control = (props) => {
  return (
    <div className="row mt-15">
      <Search onSearch={props.onSearch} />
      <Sort onSort={props.onSort} sort={props.sort} />
    </div>
  );
};

export default Control;
