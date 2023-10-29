import {operation} from "../lib/operation";
import {store} from "../store/store";
import {store as storeModel} from "../models/store";
import {counterSlice} from "../store/counterSlice";
import registerApplier = operation.registerApplier;
import Commit = storeModel.Commit;

export const {incremented, decremented} = counterSlice.actions

registerApplier('Commit', (model: Commit) => {
  console.log(model)
  if (model.action === 'increment') {
    store.dispatch(incremented())
  }
  if (model.action === 'decremented') {
    store.dispatch(decremented())
  }
})

store.subscribe(() => console.log(store.getState()))
