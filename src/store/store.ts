import {configureStore} from '@reduxjs/toolkit'
import {counterSlice} from "./counterSlice";
import {groupSlice} from "./groupSlice";
import {messageSlice} from "./messageSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    groups: groupSlice.reducer,
    messages: messageSlice.reducer
  }
})
