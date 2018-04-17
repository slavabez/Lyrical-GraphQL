import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";

class SongList extends React.Component {
  renderSongs() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return this.props.data.songs.map(song => (
        <li className="collection-item" key={song.id}>
          {song.title}
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export const songsQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(songsQuery)(SongList);

