import React from 'react'

const Post = (props) => {
  if (!props.data) return null
  const paramID = props.match.params.id || null
  const post = props.data.children.find(post => post.data.id === paramID) || null

  return (
    <div>
      <h1>{post.data.title}</h1>
      <p>Post id - {paramID}</p>
      <img src={post.data.url} alt="" className="post-image" />
    </div>
  )
}

export default Post
