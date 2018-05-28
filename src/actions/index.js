import {
    FETCH_USER,
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    FETCH_REPOS,
    FETCH_REPOS_FAILED,
    FETCH_REPOS_SUCCESS,
    FETCH_COMMITS,
    FETCH_COMMITS_SUCCESS,
    FETCH_COMMITS_FAILED,
} from "../constants";

export const fetchUser = username => ({
    type: FETCH_USER,
    payload: { username }
});

export const fetchUserSuccess = user => ({
    type: FETCH_USER_SUCCESS,
    payload: { user }
});

export const fetchUserFailed = () => ({
    type: FETCH_USER_FAILED,
});

export const fetchRepos = reposUrl => ({
    type: FETCH_REPOS,
    payload: { reposUrl }
});

export const fetchReposSuccess = repos => ({
    type: FETCH_REPOS_SUCCESS,
    payload: repos,
});

export const fetchReposFailed = () => ({
    type: FETCH_REPOS_FAILED,
});

export const fetchCommits = commitsUrl => ({
    type: FETCH_COMMITS,
    payload: { commitsUrl }
});

export const fetchCommitsSuccess = commits => ({
    type: FETCH_COMMITS_SUCCESS,
    payload: commits,
});

export const fetchCommitsFailed = () => ({
    type: FETCH_COMMITS_FAILED,
});
