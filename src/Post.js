import React from 'react';
import { Link } from 'react-router-dom';

const Post = props => {
  if (!props.data) return null;
  const paramID = props.match.params.id || null;
  const post = props.data.find(post => post.data.id === paramID) || null;

  return (
    <div class="container">
      <div className="post-header">
        <Link className="button is-link" to="/">
          Back
        </Link>
        <h1 className="title post-title">{post.data.title}</h1>
      </div>

      <span className="tag is-warning">Post id - {paramID}</span>
      <img src={post.data.url} alt="" className="post-image box" />
    </div>
  );
};

export default Post;
