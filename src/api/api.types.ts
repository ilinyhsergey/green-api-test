import type { CredentialsState } from '../store/credensials.store.ts';
import type { CheckAccountRequest } from './api-schema.ts';

export interface CheckAccountArguments {
  request: CheckAccountRequest;
  credentials: CredentialsState;
}
