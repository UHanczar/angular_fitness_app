import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { uiReducer, State as uiState, getIsLoading} from './shared/ui.reducer';
import { authReducer, State as authState, getIsAuth } from './auth/auth.reducer';

export interface State {
  ui: uiState;
  auth: authState;
}

export const reducers: ActionReducerMap<State> = {
  ui: uiReducer,
  auth: authReducer
};

export const getUiState = createFeatureSelector<uiState>('ui');
export const getIsLoadingFromState = createSelector(getUiState, getIsLoading);

export const getAuthState = createFeatureSelector<authState>('auth');
export const getIsAuthFromState = createSelector(getAuthState, getIsAuth);
