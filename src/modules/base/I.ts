
export const defineModelFactory = <T,>() => <D extends Partial<T>>(defaults?: D) => {
  return (
    required?: Omit<T, keyof D> & Partial<D>,
    changed?: Partial<T>
  ): T => {
    return {
      ...defaults,
      ...required,
      ...changed
    } as T
  }
}
