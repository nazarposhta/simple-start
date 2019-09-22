import { ACTION_REFETCH_DATA, ACTION_TOGGLE_SORT } from '../components/last_news/article_list/ArticleList.jsx';
import {ACTION_CHANGE_SOURCE} from '../components/last_news/article_filter/ArticleFilter.jsx';
import { parseDate } from '../helpers';

const initialState = {
    articles: [],
    loading: true,
    sort: true,
    sources: [ '/articles/fashion'],
    error: ''
};

/**
 * sort articles by date
 * @param articles {Array}
 * @param asc {Boolean}
 * @returns {Array}
 */
const sortArticles = (articles, asc) => {
    let reduce_articles = [];
    articles.forEach((art) => {
        if(typeof art.date === 'string'){
            reduce_articles.push({ ...art, ...{date: parseDate(art.date)} });
        } else {
            reduce_articles.push(art);
        }
    });
    return reduce_articles.sort((a, b) => {
        if(asc){
            return b.date - a.date;
        }
        return a.date - b.date;
    });
}



export const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_REFETCH_DATA:
            if(action.payload.message){
                return { ...state, error: 'Unexpected error.', loading: false };
            }
            return { ...state, articles: sortArticles(action.payload, state.sort), loading: false, error: '' };
        case ACTION_TOGGLE_SORT:
            return { ...state, sort: !state.sort, articles: sortArticles(state.articles, !state.sort) };
        case ACTION_CHANGE_SOURCE:
            if(state.sources.indexOf(action.payload) === -1){
                return { ...state, sources:  [ ...state.sources, action.payload ]  };
            } else {
                return { ...state, sources: state.sources.filter(elem => elem !== action.payload) };
            }
    }
    return state;
}