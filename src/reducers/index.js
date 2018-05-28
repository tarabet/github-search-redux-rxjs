import {
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILED,
    FETCH_COMMITS_SUCCESS,
    FETCH_COMMITS_FAILED,
} from "../constants";
import { combineReducers } from "redux";

const userInitialState = {};
const reposInitialState = [];
const commitsInitialState = [];

export const user = (state = userInitialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            return action.payload.user
        }
        case FETCH_USER_FAILED: {
            return {};
        }
        default: {
            return state;
        }
    }
};

export const repos = (state = reposInitialState, action) => {
    switch (action.type) {
        case FETCH_REPOS_SUCCESS: {
            return action.payload
        }
        case FETCH_REPOS_FAILED: {
            return [];
        }
        default: {
            return state;
        }
    }
};

export const commits = (state = commitsInitialState, action) => {
    switch (action.type) {
        case FETCH_COMMITS_SUCCESS: {
            return action.payload
        }
        case FETCH_COMMITS_FAILED: {
            return [];
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    user,
    repos,
    commits,
});