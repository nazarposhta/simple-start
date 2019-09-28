import {
  ACTION_REFETCH_DATA,
  ACTION_TOGGLE_SORT,
  SHOW_ERROR,
  FILTERING_DATA,
  CONCATING_DATA,
} from './constants';

export const actionRefetchData = (updatedData) => ({
  type: ACTION_REFETCH_DATA,
  payload: updatedData,
});
export const actionToggleSort = (sortState) => ({
  type: ACTION_TOGGLE_SORT,
  payload: sortState,
});

export const actionShowError = (source) => ({
  type: SHOW_ERROR,
  payload: source,
});

export const actionFilteringData = (source) => ({
  type: FILTERING_DATA,
  payload: source,
});

export const actionConcatingData = (source) => ({
  type: CONCATING_DATA,
  payload: source,
});
