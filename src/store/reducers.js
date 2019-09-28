import {
  ACTION_REFETCH_DATA,
  ACTION_TOGGLE_SORT,
  SHOW_ERROR,
  FILTERING_DATA,
  CONCATING_DATA,
} from './constants';
import { parseDate } from '../helpers';

const initialState = {
  articles: [],
  loading: true,
  sort: true,
  sources: ['/articles/fashion'],
  error: '',
};

/**
 * sort articles by date
 * @param articles {Array}
 * @param asc {Boolean}
 * @returns {Array}
 */
export const sortArticles = (articles, asc) => {
  const reduceArticles = [];
  articles.forEach((art) => {
    if (typeof art.date === 'string') {
      reduceArticles.push({ ...art, ...{ date: parseDate(art.date) } });
    } else {
      reduceArticles.push(art);
    }
  });
  return reduceArticles.sort((a, b) => {
    if (asc) {
      return b.date - a.date;
    }
    return a.date - b.date;
  });
};


export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REFETCH_DATA:
      if (action.payload.message) {
        return { ...state, error: 'Unexpected error.', loading: false };
      }
      return {
        ...state,
        articles: sortArticles(action.payload.articles, state.sort),
        loading: false,
        error: '',
      };
    case CONCATING_DATA:
      if (action.payload.message) {
        return { ...state, error: 'Unexpected error.', loading: false };
      }
      return {
        ...state,
        articles: sortArticles([...state.articles, ...action.payload.data.articles], state.sort),
        error: '',
        sources: [...state.sources, action.payload.category],
      };
    case FILTERING_DATA:
      return {
        ...state,
        articles: state.articles.filter((art) => art.category !== action.payload.title),
        sources: state.sources.filter((elem) => elem !== action.payload.url),
      };
    case ACTION_TOGGLE_SORT:
      return { ...state, sort: !state.sort, articles: sortArticles(state.articles, !state.sort) };
    case SHOW_ERROR:
      return {
        ...state, error: action.payload,
      };
    default:
      return state;
  }
};
