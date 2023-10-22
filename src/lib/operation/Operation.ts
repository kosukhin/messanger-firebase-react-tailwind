import {takeInstance} from "./I";

type operationTarget = Operation | Function | object

export class Operation {
  nextSteps: Operation[] = []

  constructor(readonly operationTarget: operationTarget) {
  }

  next(operationTarget: operationTarget) {
    const next = takeInstance(Operation, operationTarget)
    this.nextSteps.push(next)
    return next
  }
}

export const operation = takeInstance.bind(null, Operation)

export const flatten = (arr: any[]) => arr.flat(Infinity)
