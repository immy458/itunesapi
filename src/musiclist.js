import React, { Component } from "react";
import "./Musiclist.css";
class MusicList extends Component {
  state = {
    list: [],
    tempid: [],
    //   imageurl: "",
    x: 0,
  };
  fetchlist = () => {
    // const x = this.state.x + "['im:name'].label";
    //this.setState({ x: "sssssssssssss" });
    fetch("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        //  feed.entry[""0""][""im:name""].label
        //  console.log(response.feed.entry);
        //   console.log(response.feed.entry[0]["im:name"].label);

        this.setState({ list: response.feed.entry });
        console.log(this.state.list);
      });
  };
  componentDidMount() {
    this.fetchlist();
  }
  modalclicked(id) {
    const albumdetails = this.state.list.filter(
      (item) => item.id.attributes["im:id"] === id
    );
    this.setState({ tempid: albumdetails });
    document.getElementById("modaltitle").innerHTML =
      albumdetails[0]["im:name"].label;
    //   [""0""][""im:image""][""0""].label
    // const { imageurl } = this.setState(..."https://picsum.photos/200");
    console.log(albumdetails[0]["im:image"][0].label);
    document.getElementById("albumimg").src =
      albumdetails[0]["im:image"][0].label;
    document.getElementById("releasedate").innerHTML =
      "Release date: " + albumdetails[0]["im:releaseDate"].attributes.label;
    document.getElementById("price").innerHTML =
      "Buy For " + albumdetails[0]["im:price"].label;
    document.getElementById("price").href = albumdetails[0].id.label;
  }
  priceclicked = () => {
    const x = this.state.tempid;
    window.location.href = x[0].id.label;
  };

  render() {
    return (
      <div>
        <h1 id="noresult">NO RESULT</h1>
        <h1 className="title" id="title">
          Top 100 Albums
        </h1>
        <ul id="albumlist">
          {this.state.list.map((item, i) => (
            <li
              key={item.id.attributes["im:id"]}
              data-toggle={"modal"}
              data-target={"#exampleModal"}
              onClick={() => this.modalclicked(item.id.attributes["im:id"])}
            >
              <div className="srno"># {i + 1}</div>

              <p class="content">
                {item["im:name"].label}
                <br />
                <i>Artist: {item["im:artist"].label}</i>
              </p>
              <button className="favbutton">Fav</button>
            </li>
          ))}
        </ul>
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
                  {" "}
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
      </div>
    );
  }
}

export default MusicList;
