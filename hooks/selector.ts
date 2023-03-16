// selectors.ts
import { RootState } from './store';

export const getRefreshing = (state: RootState) => state.isRefresh;
export const getStreamingModalOpen = (state: RootState) => state.streamingModalOpen;
export const getSoonModalOpen = (state: RootState) => state.soonModalOpen;