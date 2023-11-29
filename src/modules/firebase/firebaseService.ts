import {create} from "../base/I";
import {Firebase} from "./Firebase";
import {firebaseEffect} from "./firebaseEffect";

export namespace firebaseService {
  export function buildCrud(collectionName: string) {
    return {
      async getById(id: string) {
        const result = await firebaseEffect(create(Firebase, 'get', collectionName, {
          id
        }));

        return result.result;
      },
      async getAll() {
        const result = await firebaseEffect(create(Firebase, 'list', collectionName, {}));

        return result.result;
      },
      async findById(id: string) {
        const result = await firebaseEffect(create(Firebase, 'list', collectionName, {
          where: [
            ['id', '==', id]
          ]
        }));

        return result.result;
      },
      async deleteById(id: string, onDelete?: Function) {
        const result = await firebaseEffect(create(Firebase, 'remove', collectionName, {
          id,
          onDelete
        }));

        return result.result;
      },
      async update(data: any) {
        const result = await firebaseEffect(create(Firebase, 'update', collectionName, data));

        return result.result;
      },
      async create(data: any) {
        const result = await firebaseEffect(create(Firebase, 'add', collectionName, data));

        return result.isDone
      }
    }
  }
}
