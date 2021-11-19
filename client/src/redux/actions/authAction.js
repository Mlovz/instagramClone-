import { postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const AUTH_TYPES = {
  AUTH: "AUTH",
  LOADING: "AUTH_LOADING",
  REFRESH_LOAD: "REFRESH_LOAD",
};

export const login =
  ({ userData }) =>
  async (dispatch) => {
    try {
      dispatch({ type: AUTH_TYPES.LOADING, payload: true });

      const res = await postDataApi("login", userData);
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          user: res.data.user,
          token: res.data.access_token,
        },
      });
      localStorage.setItem("firstlogin", true);

      dispatch({ type: AUTH_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({ type: AUTH_TYPES.LOADING, payload: false });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const register = ({ userData }) =>async (dispatch) => {
  try {
    dispatch({ type: AUTH_TYPES.LOADING, payload: true });

    const res = await postDataApi("register", userData);

    console.log(res);
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        user: res.data.user,
        token: res.data.access_token,
      },
    });
    localStorage.setItem("firstlogin", true);

    dispatch({ type: AUTH_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({ type: AUTH_TYPES.LOADING, payload: false });
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
}

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstlogin");
  if (firstLogin ) {
    try {
      dispatch({ type: AUTH_TYPES.REFRESH_LOAD, payload: true });

      const res = await postDataApi("refresh_token");
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          user: res.data.user,
          token: res.data.access_token,
        },
      });

      dispatch({
        type: AUTH_TYPES.REFRESH_LOAD,
        payload: false,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem('firstlogin')
    await postDataApi('logout')
    window.location.href = '/'
};
