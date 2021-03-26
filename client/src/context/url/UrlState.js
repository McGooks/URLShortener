import React, { useReducer } from "react";
import axios from "axios";
import urlContext from "./urlContext";
import urlReducer from "./UrlReducer";
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

const UrlState = (props) => {
  const initialState = {
    urls: null,
    current: null,
    error: null,
    loading: true,
    ourl: null,
  };

  const [state, dispatch] = useReducer(urlReducer, initialState);

  //Add Url
  const addUrl = async (url) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/", url, config);
      dispatch({ type: ADD_URL, payload: res.data });
    } catch (error) {
      dispatch({ type: URL_ERROR, payload: error.response.data.error });
    }
  };

  //Load Original URL
  const getOriginalUrl = async (shortenedUrlCode) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const res = await axios.get(`/${shortenedUrlCode}`, null, config);
      dispatch({ type: GET_ORIGINAL_URL, payload: res.data });
    } catch (error) {
      dispatch({
        type: URL_ERROR,
        // payload: error.response.data.error,
      });
    }
  };

  //Get Shortened Url
  const getShortUrl = async () => {
    try {
      const res = await axios.get("/url");
      dispatch({ type: GET_SHORT_URL, payload: res.data });
    } catch (error) {
      dispatch({ type: URL_ERROR, payload: error.response.data.error });
    }
  };

  //Set Current Url
  const setCurrent = (url) => {
    dispatch({ type: SET_CURRENT, payload: url });
  };

  //Clear Current Url
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Clear Urls
  const clearUrls = () => {
    dispatch({ type: CLEAR_URLS });
  };

  //Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <urlContext.Provider
      value={{
        urls: state.urls,
        current: state.current,
        error: state.error,
        loading: state.loading,
        ourl: state.ourl,
        getShortUrl,
        getOriginalUrl,
        addUrl,
        setCurrent,
        clearCurrent,
        clearUrls,
        clearErrors,
      }}
    >
      {props.children}
    </urlContext.Provider>
  );
};

export default UrlState;
