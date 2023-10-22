type Constructable = { new(...args: any): any }

export abstract class BaseModel {
  takeChanged(fields: Partial<typeof this>) {
    const newFields = Object.assign({...this}, fields)
    return new (this.constructor as Constructable)(...Object.values(newFields))
  }
}
