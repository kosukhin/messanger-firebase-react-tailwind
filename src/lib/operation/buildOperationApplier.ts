import {Operation} from "./Operation";

export function buildOperationApplier(operationsConfig: Record<string, Function>) {
  const applyOperation = async (root: Operation, prevResult: any = null) => {
    const fnName = String(root.operationTarget.constructor.name);

    if (typeof root.operationTarget === 'function') {
      prevResult = root.operationTarget(prevResult)
    } else if (root.operationTarget instanceof Operation) {
      prevResult = await applyOperation(root.operationTarget, prevResult)
    } else if (operationsConfig[fnName]) {
      prevResult = operationsConfig[fnName](root.operationTarget, prevResult)

      if (prevResult instanceof Promise) {
        prevResult = await prevResult
      }
    }

    if (root.nextSteps.length) {
      prevResult = await Promise.all((root.nextSteps.map((operation) => {
        return applyOperation(operation, prevResult)
      }) as Promise<any>[]))
    }

    if (Array.isArray(prevResult)) {
      prevResult = await Promise.all(prevResult.map(async (resultItem: any) => {
        if (resultItem instanceof Operation) {
          resultItem = await applyOperation(resultItem)
        }

        return resultItem;
      }))
    } else {
      if (prevResult instanceof Operation) {
        prevResult = await applyOperation(prevResult)
      }
    }

    return prevResult;
  }

  return {
    applyOperation,
  }
}
