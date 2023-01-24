import { Store } from '$core/Store';
import type { StoreState } from './types';

export const store = new Store<Partial<StoreState>>({});
