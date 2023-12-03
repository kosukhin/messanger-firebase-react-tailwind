import {createSlice} from "@reduxjs/toolkit";
import {MessageModel} from "../modules/message/MessageModel";

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [] as MessageModel[]
  },
  reducers: {
    setMessages: (state, {payload}) => {
      state.messages = payload
    },
  }
})
