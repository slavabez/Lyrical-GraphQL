import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongList extends React.Component {
  handleSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [
        {
          query: fetchSongs
        }
      ]
    });
  }

  renderSongs() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return this.props.data.songs.map(({ id, title }) => (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>

          <i
            className="material-icons red-text right"
            onClick={() => {
              this.handleSongDelete(id);
            }}
          >
            delete
          </i>
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

const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(deleteSong)(graphql(fetchSongs)(SongList));
