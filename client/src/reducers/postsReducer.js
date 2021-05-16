import { SET_POST, SET_POSTS, SET_CURRENT_POST, DELETE_POST } from "../actions/types";

const initialState = {
    post: {},
    posts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_CURRENT_POST:
            return {
                ...state,
                post: action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(el => el._id !== action.payload)
            }
        default:
            return state;
    }
}
