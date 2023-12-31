import { firebase } from "./firebase";

export namespace firebaseService {
  export function buildCrud(collectionName: string) {
    return {
      async getById<T>(id: string) {
        return await firebase<T>('get', collectionName, { id });
      },

      async getAll() {
        return await firebase("list", collectionName);
      },

      async findById(id: string) {
        return await firebase("list", collectionName, {
          where: [["id", "==", id]],
        });
      },

      async deleteById(id: string, onDelete?: Function) {
        return await firebase("remove", collectionName, {
          id,
          onDelete,
        });
      },

      async update(data: any) {
        return await firebase("update", collectionName, data);
      },

      async create(data: any) {
        return await firebase("add", collectionName, data);
      },
    };
  }
}
