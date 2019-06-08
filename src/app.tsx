import React from "react";
import ReactDOM from "react-dom";
import Controls, { Track } from "./Controls";
import Video from "./Video";
import { tags } from "../review.json";
import * as data from "../contents.json";
import * as docs from "../docs.json";

declare const global: any;
global.React = React;
global.data = data;
global.videos = data.contents.filter((c) => c.id.startsWith("wwdc2019")).filter((c) => c.type === "Session");
global.docs = docs;
const docsById = Object.keys(docs).map((key) => docs[key]).reduce((prev, next) => ({ ...prev, [next.name]: next.body }), {});

const videos = global.videos;

class App extends React.Component {

  constructor(...args) {
    super(...args);
    if (localStorage) {
      const stored = localStorage.getItem("data");
      if (stored) {
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

    // Calculated filter view data
    const tagObjects = Object.keys(tags).map((tagName) => ({
      id: tagName,
      selected: this.state.filters.indexOf(tagName) >= 0,
      ...tags[tagName],
    }));

    // Add non-data bookmark filter
    tagObjects.push({
      id: "bookmark",
      type: "state",
      selected: this.state.filters.indexOf("bookmark") >= 0,
      name: "Bookmarks",
    })

    // Add 'all' negative filter
    const showAll = this.state.filters.length === 0 || tagObjects.length === this.state.filters.length;
    tagObjects.unshift({ id: "all", name: "All", selected: showAll, type: "all" });
    let filteredVideos = videos;
    if (!showAll) {
      filteredVideos = videos.filter((video) => this.matchesFilters(video.id))
    }

    return <div>
      <div className="controls">
        <div className="filters">{Controls(tagObjects.filter((t) => t.type === "all"), this.toggleFilter.bind(this))}</div>
        <div className="filters">Filters: {Controls(tagObjects.filter((t) => t.type === "state"), this.toggleFilter.bind(this))}</div>
        <div className="tracks">Tracks:  {Controls(tagObjects.filter((t) => t.type === "track"), this.toggleFilter.bind(this))}</div>
        <div>Showing {filteredVideos.length} videos.</div>
      </div>
      <div className="videos">{
        filteredVideos.map((video) => (Video({
          ...video,
          bookmarked: this.state.bookmarks.indexOf(video.id) >= 0,
          summary: docsById[video.id],
        }, this.toggleBookmark.bind(this))))
      }</div>
    </div>
  }

  private matchesFilters(videoId) {
    return this.state.filters.some((filterId) => {
      switch (filterId) {
        // if the video is bookmarked
        case "bookmark": return this.state.bookmarks.indexOf(videoId) >= 0;
        // if the video list of the tag contains this video 
        case "summarized": return docsById[videoId] ? true : false;
        default: return tags[filterId].videos.indexOf(videoId) >= 0;
      }
    });
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
  