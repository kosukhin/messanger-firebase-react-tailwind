import {BaseModel} from "./BaseModel";

export type ConstructorProps<T> = T extends {
    new(...args: infer U): any
  }
  ? U
  : never

export type ConstructorResult<T> = T extends {
    new(...args: any): infer U
  }
  ? U
  : never

export function instance<T extends { new(...args: any[]): any }>(
  constructorFunction: T,
  ...args: ConstructorProps<T>
): ConstructorResult<T> {
  // eslint-disable-next-line new-cap
  return new constructorFunction(...args);
}

type applierFn<T extends any> = (model: any, ...args: any) => Promise<T> | T
const appliers = new Map();

export function createApplier<U extends any>(id: any) {
  return <T = undefined>(model: BaseModel, ...args: any): Promise<T extends undefined ? U : T> => {
    const applier = appliers.get(id)

    if (!applier) {
      throw new Error(`No applier for model ${model.constructor.name}`)
    }

    const result = applier(model, ...args)

    if (!(result instanceof Promise)) {
      return Promise.resolve(result)
    }

    return result;
  }
}

export function registerApplier(id: any, applier: applierFn<any>) {
  appliers.set(id, applier)
}

