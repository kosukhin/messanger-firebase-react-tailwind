import {createSlice} from "@reduxjs/toolkit";
import {Group} from "../modules/group/Group";

export const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [] as Group[]
  },
  reducers: {
    setGroups: (state, {payload}) => {
      console.log('groups', payload)
      state.groups = payload
    },
  }
})
