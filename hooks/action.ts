// actions.ts
import { ActionsTypes } from './store';

export function setRefreshing(value: boolean) {
  return {
    type: ActionsTypes.SetRefreshing,
    payload: value,
  };
};

export function setStreamingModalOpen(value: boolean) {
  return {
    type: ActionsTypes.SetStreamingModalOpen,
    payload: value,
  };
};

export function setSoonModalOpen(value: boolean) {
  return {
    type: ActionsTypes.SetSoonModalOpen,
    payload: value,
  };
};