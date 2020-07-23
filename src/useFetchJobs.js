import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  IS_LAST_PAGE: "is-last-page"
};

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };
    case ACTIONS.IS_LAST_PAGE:
      return {
        ...state,
        isLastPage: action.payload.jobs.length === 0
      };
    default:
      return state;
  }
}

const getPageResults = (page, params, action, dispatch) => {
  const cancelToken = axios.CancelToken.source();
  dispatch({ type: ACTIONS.MAKE_REQUEST });
  axios
    .get(BASE_URL, {
      cancelToken: cancelToken.token,
      params: { markdown: true, page, ...params }
    })
    .then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
    })
    .catch(e => {
      if (axios.isCancel(e)) return;
      dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    });

  return cancelToken;
};

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false });
  useEffect(() => {
    const cancelToken = getPageResults(
      page,
      params,
      ACTIONS.GET_DATA,
      dispatch
    );

    const cancelToken2 = getPageResults(
      page + 1,
      params,
      ACTIONS.IS_LAST_PAGE,
      dispatch
    );
    // dispatch({ type: ACTIONS.MAKE_REQUEST });
    // axios
    //   .get(BASE_URL, {
    //     cancelToken: cancelToken.token,
    //     params: { markdown: true, page, ...params }
    //   })
    //   .then(res => {
    //     dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
    //   })
    //   .catch(e => {
    //     if (axios.isCancel(e)) return;
    //     dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
    //   });

    return () => {
      cancelToken.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);
  return state;
}
