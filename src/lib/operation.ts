import {BaseModel} from './model';

/**
 * Абстракция для выполнения операций (внешних зависимостей)
 */
export namespace operation {
  const modelsToAppliersMap: Record<string, Function> = {};

  export function apply<T extends any>(model: BaseModel): Promise<T> | never {
    if (modelsToAppliersMap[model.constructor.name]) {
      return modelsToAppliersMap[model.constructor.name](model) as Promise<T>;
    }

    throw new Error(`Model ${model.constructor.name} is not configured for operations!`);
  }

  export function registerApplier(modelName: string, applier: Function) {
    modelsToAppliersMap[modelName] = applier;
  }
}

