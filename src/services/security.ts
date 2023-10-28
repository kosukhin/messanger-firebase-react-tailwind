import {operation} from "../lib/operation";
import {security} from "../models/security";
import {v4 as uuidv4} from 'uuid';
import registerApplier = operation.registerApplier;
import Hash = security.Hash;

registerApplier('Hash', (model: Hash) => {
  if (model.type === 'uuid') {
    return new security.Uuid(uuidv4());
  }

  return new security.Uuid('');
})
