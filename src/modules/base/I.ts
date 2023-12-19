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

export const defineModelEffect = <R extends any = '__R__',>() => <T extends (...args: any[]) => any>(modelFactory: T, fn: (model: ReturnType<T>) => R extends '__R__' ? ReturnType<T> : R) => {
  return <CR = '__CR__'>(...args: Parameters<T>) => {
    const model = modelFactory(...args);
    return fn(model) as CR extends '__CR__' ? (R extends '__R__' ? ReturnType<T> : R) : CR
  }
}
