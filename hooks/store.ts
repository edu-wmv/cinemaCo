// store.ts
import { legacy_createStore as createStore } from 'redux';

export enum ActionsTypes {
  SetRefreshing = 'SET_REFRESHING',
  SetStreamingModalOpen = 'SET_STREMING_NOW_MODAL_OPEN',
  SetSoonModalOpen = 'SET_SOON_MODAL_OPEN',
}

export interface RootState {
  isRefresh: boolean;
  streamingModalOpen: boolean;
  soonModalOpen: boolean;
}

interface SetRefreshBoolean {
  type: ActionsTypes.SetRefreshing;
  payload: boolean;
}

interface SetModalOpen {
  type: ActionsTypes.SetStreamingModalOpen;
  payload: boolean;
}

const initialState: RootState = {
  isRefresh: false,
  streamingModalOpen: false,
  soonModalOpen: false,
};

function rootReducer(
  state: RootState = initialState,
  action: any
): RootState {
  switch (action.type) {
    case ActionsTypes.SetRefreshing:
      return {
        ...state,
        isRefresh: action.payload,
      };

    case ActionsTypes.SetStreamingModalOpen:
      return {
        ...state,
        streamingModalOpen: action.payload,
      };

    case ActionsTypes.SetSoonModalOpen:
      return {
        ...state,
        soonModalOpen: action.payload,
      }

    default:
      return state;
  }
}

export const store = createStore(rootReducer);
