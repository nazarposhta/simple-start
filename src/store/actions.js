import { ACTION_REFETCH_DATA, ACTION_TOGGLE_SORT, ACTION_CHANGE_SOURCE } from './constants';

export const actionRefetchData = (updatedData) => ({
  type: ACTION_REFETCH_DATA,
  payload: updatedData,
});
export const actionToggleSort = (sortState) => ({
  type: ACTION_TOGGLE_SORT,
  payload: sortState,
});

export const actionChangeSource = (source) => ({
  type: ACTION_CHANGE_SOURCE,
  payload: source,
});
