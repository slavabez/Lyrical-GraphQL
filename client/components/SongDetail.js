import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongDetails from "../queries/fetchSongDetails";

import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return (
        <div>
          <Link to="/">Back</Link>Loading...
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/">Back</Link>
          <h3>{this.props.data.song.title}</h3>
          <LyricCreate songId={this.props.params.id} />
          <LyricList lyrics={this.props.data.song.lyrics} />
        </div>
      );
    }
  }
}

export default graphql(fetchSongDetails, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
