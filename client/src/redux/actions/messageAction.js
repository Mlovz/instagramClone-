

export const MESSAGE_TYPES = {
    ADD_USER: 'ADD_USER',
}

export const addUser = (user) => async(dispatch) => {
    dispatch({type: MESSAGE_TYPES.ADD_USER, payload: user})
}