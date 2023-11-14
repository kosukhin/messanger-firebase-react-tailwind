import {createApplier, takeInstance} from "../base/I";
import {Firebase} from "./Firebase";

export namespace firebaseService {
  export const applierId = Symbol()
  export const apply = createApplier(applierId)

  export function buildCrud(collectionName: string) {
    return {
      async getById(id: string) {
        const result = await apply<Firebase>(takeInstance(Firebase, 'get', collectionName, {
          id
        }));

        return result.result;
      },
      async getAll() {
        const result = await apply<Firebase>(takeInstance(Firebase, 'list', collectionName, {}));

        return result.result;
      },
      async findById(id: string) {
        const result = await apply<Firebase>(takeInstance(Firebase, 'list', collectionName, {
          where: [
            ['id', '==', id]
          ]
        }));

        return result.result;
      },
      async deleteById(id: string, onDelete?: Function) {
        const result = await apply<Firebase>(takeInstance(Firebase, 'remove', collectionName, {
          id,
          onDelete
        }));

        return result.result;
      },
      async update(data: any) {
        const result = await apply<Firebase>(takeInstance(Firebase, 'update', collectionName, data));

        return result.result;
      },
      async create(data: any) {
        const result = await apply<Firebase>(takeInstance(Firebase, 'add', collectionName, data));

        return result.isDone
      }
    }
  }
}
