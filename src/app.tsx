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

  public state = { filters: [] };

  toggleFilter(name: string) {
    if (this.state.filters.indexOf(name) >= 0) {
      // remove
      this.setState({ filters: this.state.filters.filter((s) => s !== name) });
    } else {
      // add
      this.setState({ filters: [...this.state.filters, name] });
    }
  }
  
  render() {
    const tagObjects = Object.keys(tags).map((tagName) => ({
      id: tagName,
      selected: this.state.filters.indexOf(tagName) >= 0,
      ...tags[tagName],
    }));

    tagObjects.unshift({ id: "all", name: "All", selected: this.state.filters.length === 0 || tagObjects.length === this.state.filters.length });

    return <div>
      <div className="controls">{Controls(tagObjects, this.toggleFilter.bind(this))}</div>
      <div className="videos">{
        videos.map((video) => (Video(video)))
      }</div>
    </div>;
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  
  