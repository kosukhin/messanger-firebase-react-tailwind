import {Applier, BaseRepository} from "../base/BaseRepository";
import {StoreCommit} from "./StoreCommit";
import {store} from "../../store/store";
import {counterSlice} from "../../store/counterSlice";

export class StoreCommitRepository extends BaseRepository {
  registerApplier(): Applier {
    const {incremented, decremented} = counterSlice.actions
    store.subscribe(() => console.log(store.getState()))

    return ['StoreCommit', (model: StoreCommit) => {
      console.log(model)
      if (model.action === 'increment') {
        store.dispatch(incremented())
      }
      if (model.action === 'decremented') {
        store.dispatch(decremented())
      }
    }]
  }
}
