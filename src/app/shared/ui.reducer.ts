import { Action} from '@ngrx/store';

import { UiActions, START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState = {
  isLoading: false
};

export const uiReducer = (state = initialState, action: UiActions) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export const getIsLoading = (state: State) => state.isLoading;
