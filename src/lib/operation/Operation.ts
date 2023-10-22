import {takeInstance} from "../I";

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

export const OperationsConfig: Record<string, Function> = {}

export async function applyOperation(root: Operation, prevResult: any = null) {
  const fnName = String(root.operationTarget.constructor.name);

  if (typeof root.operationTarget === 'function') {
    prevResult = root.operationTarget(prevResult)
  } else if (root.operationTarget instanceof Operation) {
    prevResult = await applyOperation(root.operationTarget, prevResult)
  } else if (OperationsConfig[fnName]) {
    prevResult = OperationsConfig[fnName](root.operationTarget, prevResult)

    if (prevResult instanceof Promise) {
      prevResult = await prevResult
    }
  }

  if (root.nextSteps.length) {
    prevResult = await Promise.all((root.nextSteps.map((operation) => {
      return applyOperation(operation, prevResult)
    }) as Promise<any>[]))
  }

  return prevResult;
}
