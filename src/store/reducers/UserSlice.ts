import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { fetchUsers } from './ActionCreators'

interface UserState {
  users: IUser[]
  isLoading: boolean
  error: string
  limit: number
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
  limit: 15,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.pending.type, (state) => {
      state.isLoading = true
    });
    builder.addCase(fetchUsers.rejected.type, (state, action: PayloadAction<any>) => {
      state.isLoading = false
      state.error = action.payload
    });
  },
})

export default userSlice.reducer
