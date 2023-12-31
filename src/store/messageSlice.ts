import {createSlice} from "@reduxjs/toolkit";
import {Message} from "../modules/message/message";

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [] as Message[]
  },
  reducers: {
    setMessages: (state, {payload}) => {
      state.messages = payload
    },
  }
})
