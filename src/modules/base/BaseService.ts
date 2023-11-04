import {BaseRepository} from './BaseRepository';
import {BaseModel} from './BaseModel';

export abstract class BaseService {
  repositories: BaseRepository[] = []
  appliers: Record<string, Function> = {}
  isSetup = false
  isDebug = true

  setup() {
    if (!this.isSetup) {
      this.isDebug && console.log('setup service ', this.constructor.name);
      this.repositories.forEach(repository => {
        repository.install(this);
      });
      this.isSetup = true;
    }

    return this;
  }

  apply<T extends any>(model: BaseModel): Promise<T> | never {
    if (this.appliers[model.constructor.name]) {
      const result = this.appliers[model.constructor.name](model);

      if (!(result instanceof Promise)) {
        return Promise.resolve(result);
      }

      return result;
    }

    throw new Error(`Model ${model.constructor.name} is not configured for service! ${this.constructor.name}`);
  }
}
