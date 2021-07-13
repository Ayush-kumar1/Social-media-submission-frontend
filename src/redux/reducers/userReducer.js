import { ActionTypes } from "../constants/action-type";

const initialState = [];

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.USER:
            return payload;

        case ActionTypes.CLEAR:
            return null;

        case ActionTypes.UPDATE:
            return {
                ...state,
                followers: payload.followers,
                following: payload.following
            }

        case ActionTypes.UPDATEPIC:
            return {
                ...state,
                pic: payload
            }
    }
}