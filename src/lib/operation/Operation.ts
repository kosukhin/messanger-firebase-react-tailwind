import {takeInstance} from "./I";

type operationTarget = Operation | Function | object

export class Operation {
  public errorHandler?: Function
  public nextSteps: Operation[] = []

  constructor(readonly operationTarget: operationTarget) {
  }

  then(operationTarget: operationTarget) {
    const next = takeInstance(Operation, operationTarget)
    this.nextSteps.push(next)
    return next
  }

  catch(cb: Function) {
    this.errorHandler = cb
  }
}

export const operation = takeInstance.bind(null, Operation)

export const flatten = (arr: any[]) => arr.flat(Infinity)
