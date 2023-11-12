import {BaseService} from "./BaseService";

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

export function takeInstance<T extends { new(...args: any[]): any }>(
  constructorFunction: T,
  ...args: ConstructorProps<T>
): ConstructorResult<T> {
  // eslint-disable-next-line new-cap
  return new constructorFunction(...args);
}

const singletons: any = {};

export function takeSingleton<T extends { new(...args: any[]): any }>(
  constructorFunction: T,
  ...args: ConstructorProps<T> | []
): ConstructorResult<T> {
  if (singletons[constructorFunction.name]) {
    return singletons[constructorFunction.name];
  }
  // eslint-disable-next-line new-cap
  singletons[constructorFunction.name] = new constructorFunction(...args);
  return singletons[constructorFunction.name];
}

export function takeService<T extends { new(...args: any[]): any }>(
  constructorFunction: T
): ConstructorResult<T> {
  const instance: any = takeSingleton(constructorFunction)

  if (!(instance instanceof BaseService)) {
    throw new TypeError('Cant create service')
  }

  return instance.setup() as ConstructorResult<T>
}

