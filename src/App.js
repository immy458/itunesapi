import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MusicList from "./musiclist";
import Search from "./Search";

class App extends Component {
  onSearch = () => {
    document.getElementById("searchload").style.display = "block";
    document.getElementById("searchload").setAttribute("class", "searchloader");
    setTimeout(function () {
      var searchval = document.getElementById("searchinput").value;
      var filter, albums, Container, title, i;
      var x = 0;
      document.getElementById("noresult").style.display = "none";
      document.getElementById("title").style.display = "block";

      filter = searchval.toUpperCase();
      Container = document.getElementById("albumlist");
      albums = Container.getElementsByTagName("li");
      for (i = 0; i < albums.length; i++) {
        title = albums[i].querySelector("p.content");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
          albums[i].style.display = "";
          x = x + 1;
        } else {
          albums[i].style.display = "none";
        }
      }
      if (x == 0) {
        document.getElementById("noresult").style.display = "block";
        document.getElementById("title").style.display = "none";
      }
      document.getElementById("searchload").style.display = "none";
    }, 1000);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Boing Boing Team</p>
        </header>
        <Search onSearch={this.onSearch} />
        <div>
          <MusicList />
        </div>
      </div>
    );
  }
}

export default App;
