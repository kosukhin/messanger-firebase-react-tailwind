export type ID<T extends (...args: any[]) => any> =  Parameters<T>

export const id = <T extends (...args: any[]) => any>(...args: any[]): ID<T> => args as ID<T>
