// TODO тут нужно придумать правильную типизацию для required
export function defineModelFactory<T>(defaults: Partial<T> = {}) {
  return (
    required: Partial<T> = {},
    changed: Partial<T> = {}
  ): T => {
    return {
      ...defaults,
      ...required,
      ...changed
    } as T
  }
}
