import React from "react";
import ReactDOM from "react-dom";
import Controls, { Track } from "./Controls";
import Video from "./Video";
import { tags, docs } from "../review.json";
import * as data from "../contents.json";

declare const global: any;
global.React = React;
global.data = data;
global.videos = data.contents.filter((c) => c.id.startsWith("wwdc2019")).filter((c) => c.type === "Session");

const videos = global.videos;


class App extends React.Component {

  constructor(...args) {
    super(...args);
    if (localStorage) {
      const stored = localStorage.getItem("data");
      console.log("Data")
      if (stored) {
        console.log("Setting state", JSON.parse(stored))
        this.state = JSON.parse(stored);
      }
    }
  }

  public state = { filters: [], bookmarks: [], showBookmarkedOnly: false };

  toggleFilter(name: string, selected: boolean) {
    if (name === "all") {
      if (selected) {
        this.setState({ filters: [] });
      }
    } else {
      if (!selected) {
        // remove
        this.setState({ filters: this.state.filters.filter((s) => s !== name) });
      } else {
        // add
        this.setState({ filters: [...this.state.filters, name] });
      }  
    }
  }

  toggleBookmark(name: string, selected: boolean) {
    if (!selected) {
      // remove
      this.setState({ bookmarks: this.state.bookmarks.filter((s) => s !== name) });
    } else {
      // add
      this.setState({ bookmarks: [...this.state.bookmarks, name] });
    }
  }
  
  render() {
    // Save shown state for later
    localStorage.setItem("data", JSON.stringify(this.state));
    console.log("Writing state", JSON.stringify(this.state));

    // Calculated filter view data
    const tagObjects = Object.keys(tags).map((tagName) => ({
      id: tagName,
      selected: this.state.filters.indexOf(tagName) >= 0,
      ...tags[tagName],
    }));

    // Add non-data bookmark filter
    tagObjects.push({
      id: "bookmark",
      selected: this.state.filters.indexOf("bookmark") >= 0,
      name: "Bookmarks",
    })

    // Add 'all' negative filter
    tagObjects.unshift({ id: "all", name: "All", selected: this.state.filters.length === 0 || tagObjects.length === this.state.filters.length });

    return <div>
      <div className="controls">{Controls(tagObjects, this.toggleFilter.bind(this))}</div>
      <div className="videos">{
        videos.map((video) => (Video({ ...video, bookmarked: this.state.bookmarks.indexOf(video.id) >= 0 }, this.toggleBookmark.bind(this))))
      }</div>
    </div>;
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
  