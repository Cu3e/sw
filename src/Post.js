import React from 'react'
import { Link } from 'react-router-dom'

const Post = (props) => {
  if (!props.data) return null
  const paramID = props.match.params.id || null
  const post = props.data.find(post => post.data.id === paramID) || null

  return (
    <div>
      <ul><li><Link to="/">back</Link></li></ul>
      <h1>{post.data.title}</h1>
      <p>Post id - {paramID}</p>
      <img src={post.data.url} alt="" className="post-image" />
    </div>
  )
}

export default Post
