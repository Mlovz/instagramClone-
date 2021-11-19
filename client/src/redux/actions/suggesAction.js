import {GLOBALTYPES} from './globalTypes'
import {getDataApi} from '../../utils/fetchData'

export const SUGGES_TYPES = {
  LOADING: "SUGGES_LOADING",
  GET_SUGGES_USERS: "GET_SUGGES_USERS",
};

export const getSugges = (token) => async (dispatch) => {
  try {
    dispatch({type: SUGGES_TYPES.LOADING, payload: true})
    const res = await getDataApi('suggestionsUser', token)


    dispatch({type: SUGGES_TYPES.GET_SUGGES_USERS, payload: res.data.users})
    
    dispatch({type: SUGGES_TYPES.LOADING, payload: false})
      
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};