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

export function create<T extends { new(...args: any[]): any }>(
  constructorFunction: T,
  ...args: ConstructorProps<T>
): ConstructorResult<T> {
  // eslint-disable-next-line new-cap
  return new constructorFunction(...args);
}

export function change<T extends object>(
  model: T,
  fields: Partial<T>
): T {
  return Object.assign({...model}, fields)
}
