import React, { FC } from 'react'
import { IPost } from '../models/IPost'

interface PostItemProps {
  post: IPost,
  remove: (post: IPost) => void,
  update: (post: IPost) => void,
}

export const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {
  function handleRemovePost(event: any) {
    event?.stopPropagation()
    remove(post)
  }
  function handleUpdatePost(event: any) {
    event?.stopPropagation()
    const title = prompt() || ''
    update({...post, title})
  }
  return (
    <div style={{ border: '2px solid', margin: 10, padding: 10 }}>
      <div style={{display: 'flex'}}>
        <h2>{post.id}</h2>
        <h2>{post.title}</h2>
      </div>
      <p>{post.body}</p>
      <button onClick={handleRemovePost}>Delete</button>
      <button onClick={handleUpdatePost}>Update</button>
    </div>
  )
}
