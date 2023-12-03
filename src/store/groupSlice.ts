import {createSlice} from "@reduxjs/toolkit";
import {GroupModel} from "../modules/group/GroupModel";

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [] as GroupModel[]
  },
  reducers: {
    setGroups: (state, {payload}) => {
      state.groups = payload
    },
  }
})
