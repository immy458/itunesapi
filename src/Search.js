import React, { Component } from "react";
import "./Search.css";
class Search extends Component {
  state = {};

  render() {
    return (
      <div>
        <form
          className="form-inline d-flex justify-content-center md-form 2"
          onSubmit="javascript:void(0);"
        >
          <span id="searchloader">
            <div id="searchload"></div>
          </span>
          <i className="fas fa-search" aria-hidden="true"></i>
          <input
            id="searchinput"
            class="form-control form-control-sm ml-3 w-50"
            type="text"
            placeholder="Search for album or artist"
            aria-label="Search"
            required
            onKeyUp={() => this.props.onSearch()}
          />
        </form>
      </div>
    );
  }
}

export default Search;
