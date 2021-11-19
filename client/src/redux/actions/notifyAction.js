import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const NOTIFY_TYPES = {
  CREATE_NOTIFY: "CREATE_NOTIFY",
  GET_NOTIFY: "GET_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  DELETE_ALL: 'DELETE_ALL'
};

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    console.log({ msg });
    try {
      const res = await postDataApi("notify", msg, auth.token);
      const newData = {
        ...res.data.notify,
        user: {
          ...msg.user,
        },
      };

      socket.emit("createNotify", newData);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getNotify = (token) => async (dispatch) => {
  try {
    const res = await getDataApi("notifies", token);

    dispatch({ type: NOTIFY_TYPES.GET_NOTIFY, payload: res.data.notifies });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      await deleteDataApi(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );

      socket.emit("removeNotify", msg);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

  export const isReadNotify = ({notify, auth}) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...notify, isRead: true}})

    try {

      await patchDataApi(`isReadNotify/${notify._id}`, null, auth.token)
      
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }

  export const deleteNotify = (token) => async (dispatch) => {
      dispatch({type: NOTIFY_TYPES.DELETE_ALL, payload: []})
      try {

        const res = await deleteDataApi('deleteAllNotify', token)
        console.log(res);
        
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: err.response.data.msg,
          },
        });
      }
  }