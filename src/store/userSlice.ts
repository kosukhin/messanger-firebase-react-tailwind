import {createSlice} from "@reduxjs/toolkit";
import {UserModel} from "../modules/user/UserModel";

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserModel[]
  },
  reducers: {
    setUsers: (state, {payload}) => {
      state.users = payload
    },
  }
})
