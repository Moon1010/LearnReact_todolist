import React, { useState } from "react";

const Search = (props) => {
  const [keyword, setKeyword] = useState("");

  const onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setKeyword(value);
  };

  const onSearch = () => {
    props.onSearch(keyword);
  };

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          name="keyword"
          value={keyword}
          onChange={onChange}
        />
        <span className="input-group-btn">
          <button className="btn btn-primary" type="submit" onClick={onSearch}>
            <span className="fa fa-search mr-5"></span>Tìm
          </button>
        </span>
      </div>
    </div>
  );
};

export default Search;
