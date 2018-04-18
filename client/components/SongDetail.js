import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongDetails from "../queries/fetchSongDetails";

class SongDetail extends Component {
  render() {
    console.log(this.props);
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
        </div>
      );
    }
  }
}

export default graphql(fetchSongDetails, {
  options: props => ({ variables: { id: props.params.id } })
})(SongDetail);
