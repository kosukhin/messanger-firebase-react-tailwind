import {createSlice} from "@reduxjs/toolkit";
import {User} from "../modules/user/User";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[]
  },
  reducers: {
    setUsers: (state, {payload}) => {
      state.users = payload
    },
  }
})
