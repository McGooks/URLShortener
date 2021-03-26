/* eslint-disable import/no-anonymous-default-export */
import {
  GET_SHORT_URL,
  GET_ORIGINAL_URL,
  ADD_URL,
  SET_CURRENT,
  CLEAR_CURRENT,
  URL_ERROR,
  CLEAR_ERRORS,
  CLEAR_URLS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_URL: {
      return {
        ...state,
        urls: action.payload,
        loading: false,
      };
    }
    case GET_SHORT_URL: {
      return {
        ...state,
        urls: action.payload,
        loading: false,
      };
    }
    case GET_ORIGINAL_URL: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case CLEAR_URLS: {
      return {
        ...state,
        urls: null,
        error: null,
        current: null,
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    }
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null,
      };
    }
    case URL_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
