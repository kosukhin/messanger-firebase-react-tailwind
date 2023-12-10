export const defineModelFactory = <T,>() => <D extends Partial<T>>(defaults?: D) => {
  return (
    required?: Omit<T, keyof D> & Partial<D>,
    changed?: Partial<T>
  ): Readonly<T> => {
    return Object.freeze({
      ...defaults,
      ...required,
      ...changed
    } as T)
  }
}

export const defineModelEffect = <T extends (...args: any[]) => any, R extends any>(modelFactory: T, fn: (model: ReturnType<T>) => Promise<R>) => {
  return async (...args: Parameters<T>): Promise<R> => {
    const model = modelFactory(...args);
    return fn(model)
  }
}
