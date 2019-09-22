import {ACTION_REFETCH_DATA, ACTION_TOGGLE_SORT} from "../components/last_news/article_list/ArticleList.jsx";
import {ACTION_CHANGE_SOURCE} from '../components/last_news/article_filter/ArticleFilter.jsx';

export const actionRefetchData = (updatedData) => {
    return {
        type: ACTION_REFETCH_DATA,
        payload: updatedData
    }
}
export const actionToggleSort = (sortState) => {
    return {
        type: ACTION_TOGGLE_SORT,
        payload: sortState
    }
}

export const actionChangeSource = (source) => {
    return {
        type: ACTION_CHANGE_SOURCE,
        payload: source
    }
}