import React, { Component } from "react";
import "./Musiclist.css";
class MusicList extends Component {
  state = {
    //initialising state
    list: [], //to store all albums data
    tempid: [],
    x: 0,
  };
  fetchlist = () => {
    fetch("https://itunes.apple.com/us/rss/topalbums/limit=100/json") //request is made to the itunes api
      .then((response) => response.json()) //handles the response and parse the response as JSON,
      .then((response) => {
        //  console.log(response);
        this.setState({ list: response.feed.entry }); //updates the state, list now stores the response(albums details)
        //console.log(this.state.list);
      });
  };
  componentDidMount() {
    this.fetchlist(); //call to fetchlist method
  }
  modalclicked(id) {
    const albumdetails = this.state.list.filter(
      //filteing the alubumdetails based on the id which we have received
      (item) => item.id.attributes["im:id"] === id
    );
    this.setState({ tempid: albumdetails }); //tempid stores albumdetails
    document.getElementById("modaltitle").innerHTML = //displays name of the album in modal
      albumdetails[0]["im:name"].label;
    console.log(albumdetails[0]["im:image"][0].label); //displays the album images in moal
    document.getElementById("albumimg").src =
      albumdetails[0]["im:image"][0].label;
    document.getElementById("releasedate").innerHTML = //displays release date of the album in modal
      "Release date: " + albumdetails[0]["im:releaseDate"].attributes.label;
    document.getElementById("price").innerHTML = //diplays price of the album
      "Buy For " + albumdetails[0]["im:price"].label;
  }
  priceclicked = () => {
    const x = this.state.tempid; // x stores the album details
    window.location.href = x[0].id.label; //when the user clicks buy button the code redirects the user to the itunes official page
  };
  favclicked = (id) => {
    var ul, li, i; //variable initialisation
    var present = "false";
    //albumdetails stores details of album which has been favourited
    const albumdetails = this.state.list.filter(
      (item) => item.id.attributes["im:id"] === id
    );
    ul = document.getElementById("favlist");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      //checks if the album is already present in the favourite list
      if (li[i].innerHTML === albumdetails[0]["im:name"].label) {
        present = "true";
        break;
      }
    }
    if (present === "true") {
      //removes the album from favourite list
      ul.removeChild(li[i]);
      //changes bg image of button
      document.getElementById(
        albumdetails[0].id.attributes["im:id"]
      ).style.background =
        "url('https://api.iconify.design/clarity:heart-line.svg?color=white') no-repeat center center / contain";
    } else {
      //changes bg image of button
      document.getElementById(
        albumdetails[0].id.attributes["im:id"]
      ).style.background =
        "url('https://api.iconify.design/clarity:heart-solid.svg?color=red') no-repeat center center / contain";
      //adds the ablum in favpurite list
      ul = document.getElementById("favlist");
      li = document.createElement("li");
      li.setAttribute("id", albumdetails[0].id.attributes["im:id"]);
      li.appendChild(document.createTextNode(albumdetails[0]["im:name"].label));
      ul.appendChild(li); //appends the album in favourite list
    }
  };
  showfav = () => {
    //check if fav list contains album
    if (document.getElementById("favlist").hasChildNodes()) {
      document.getElementById("showfavlist").style.display = "none"; //hides the display message
    } else {
      document.getElementById("showfavlist").style.display = "block"; //shows the display message
    }
  };
  render() {
    return (
      <div>
        <span>
          <button
            className="btn btn-sm m-100 fav"
            data-toggle={"modal"}
            data-target={"#favalbums"}
            onClick={this.showfav}
          >
            Show Favourites
          </button>
        </span>
        <h1 id="noresult">NO RESULT</h1>
        <h1 className="title" id="title">
          Top 100 Albums
        </h1>
        <ul id="albumlist">
          {this.state.list.map((item, i) => (
            <li key={item.id.attributes["im:id"]}>
              <div className="srno"># {i + 1}</div>
              <p
                className="content"
                data-toggle={"modal"}
                data-target={"#exampleModal"}
                onClick={() => this.modalclicked(item.id.attributes["im:id"])}
              >
                {item["im:name"].label}
                <br />
                <i>Artist: {item["im:artist"].label}</i>
              </p>
              <button
                id={item.id.attributes["im:id"]}
                className="favbutton"
                onClick={() => this.favclicked(item.id.attributes["im:id"])}
              ></button>
            </li>
          ))}
        </ul>
        {/*Modal to show album details*/}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center w-100" id="modaltitle">
                  .......
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <img
                className="albumimage"
                id="albumimg"
                width="300"
                height="300"
              />
              <div className="modal-body">
                <i>
                  <h5 id="releasedate"></h5>
                </i>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  id="price"
                  className="btn btn-primary"
                  href=""
                  onClick={this.priceclicked}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Modal to show favourite albums*/}

        <div
          className="modal fade"
          id="favalbums"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center w-100" id="modaltitle">
                  Favourite Albums
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body" id="favbody">
                <h1
                  id="showfavlist"
                  style={{ color: "black", fontSize: "23px" }}
                >
                  List Empty!!
                </h1>
                <ul id="favlist" className="favlist"></ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicList;
