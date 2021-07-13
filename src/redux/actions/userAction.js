import { ActionTypes } from "../constants/action-type";

export const userAction = (user) => {
    return {
        type: ActionTypes.USER,
        payload: user
    }
}

export const clearAction = () => {
    return {
        type: ActionTypes.CLEAR,
        payload: null
    }
}

export const updateAction = (result) => {
    return {
        type: ActionTypes.UPDATE,
        payload: result
    }
}

export const updatepicAction = (result) => {
    return {
        type: ActionTypes.UPDATEPIC,
        payload: result.pic
    }
}