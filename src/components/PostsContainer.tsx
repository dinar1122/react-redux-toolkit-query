import React from 'react'
import { postAPI } from '../services/PostService'
import { PostItem } from './PostItem'
import { IPost } from '../models/IPost'
import { useAppSelector } from '../hooks/redux'

export default function PostsContainer() {
  const { limit } = useAppSelector((state) => state.userReducer)
  const { data: posts } = postAPI.useFetchAllPostsQuery(limit)
  const [createPost, {}] = postAPI.useCreatePostMutation()
  const [removePost, {}] = postAPI.useDeletePostMutation()
  const [updatePost, {}] = postAPI.useUpdatePostMutation()

  async function handleCreatePost() {
    const title = prompt()
    await createPost({ title, body: title } as IPost)
  }

  return (
    <div>
      <div className="post__container">
        <button onClick={handleCreatePost}>Create post</button>
        {posts?.map((element: any) => (
          <PostItem
            remove={removePost}
            update={updatePost}
            key={element.id}
            post={element}
          />
        ))}
      </div>
    </div>
  )
}
