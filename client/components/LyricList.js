import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  handleLikePress(id) {
    this.props.mutate({ variables: { id } });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => (
      <li
        className="collection-item"
        key={id}
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {content}
        <div className="vote-box">
          <i
            className="material-icons text-blue"
            onClick={() => {
              this.handleLikePress(id);
            }}
          >
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
