import {firebaseModel} from "./FirebaseModel";
import {firebase} from "./firebase";

export namespace firebaseService {
  export function buildCrud(collectionName: string) {
    const baseModel = firebaseModel({
      action: 'get',
      collection: collectionName
    })

    return {
      async getById(id: string) {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'get',
          data: {
            id
          }
        }));

        return result.result;
      },

      async getAll() {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'list'
        }));

        return result.result;
      },

      async findById(id: string) {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'list',
          data: {
            where: [
              ['id', '==', id]
            ]
          }
        }));

        return result.result;
      },

      async deleteById(id: string, onDelete?: Function) {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'remove',
          data: {
            id,
            onDelete
          }
        }));

        return result.result;
      },

      async update(data: any) {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'update',
          data
        }));

        return result.result;
      },

      async create(data: any) {
        const result = await firebase(firebaseModel(baseModel, {
          action: 'add',
          data
        }));

        return result.isDone
      }
    }
  }
}
