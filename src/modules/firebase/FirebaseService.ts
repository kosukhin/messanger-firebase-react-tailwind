import {BaseService} from "../base/BaseService";
import {takeInstance, takeSingleton} from "../base/I";
import {FirebaseRepository} from "./FirebaseRepository";
import {takeServices} from "../base/takeServices";
import {Firebase} from "./Firebase";

export interface FirebaseCrud<T extends any> {
  getById(id: string): Promise<T>;

  getAll(): Promise<T>;

  findById(id: string): Promise<T>;

  deleteById(id: string, onDelete?: Function): Promise<T>;

  update(data: any): Promise<T>;

  create(data: any): Promise<T>;
}

export class FirebaseService extends BaseService {
  repositories = [
    takeSingleton(FirebaseRepository)
  ]

  buildCrud(collectionName: string): FirebaseCrud<any> {
    return {
      async getById(id: string) {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'get', collectionName, {
          id
        }));

        return result.result;
      },
      async getAll() {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'list', collectionName, {}));

        return result.result;
      },
      async findById(id: string) {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'list', collectionName, {
          where: [
            ['id', '==', id]
          ]
        }));

        return result.result;
      },
      async deleteById(id: string, onDelete?: Function) {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'remove', collectionName, {
          id,
          onDelete
        }));

        return result.result;
      },
      async update(data: any) {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'update', collectionName, data));

        return result.result;
      },
      async create(data: any) {
        const {firebase} = takeServices();
        const result = await firebase.apply<Firebase>(takeInstance(Firebase, 'add', collectionName, data));

        return result.isDone
      }
    }
  }
}
