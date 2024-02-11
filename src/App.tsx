import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { userSlice } from './store/reducers/UserSlice'
import { fetchUsers } from './store/reducers/ActionCreators'
import PostsContainer from './components/PostsContainer'
function App() {
  const { limit } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const { setLimit} = userSlice.actions
  const { users, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  )
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div className="App">
      <div>postItem limit from store: {limit}</div>
      <input type="text" onChange={(event)=> {dispatch(setLimit(Number(event?.target.value)))}} />
      {isLoading ? <h1> Loading ...</h1> : <PostsContainer />}
      {error && <h1> {error}</h1>}
      <div>
        {users?.map((user: any) => {
          return <div key={user.id}>{user.email}</div>
        })}
      </div>
    </div>
  )
}

export default App
