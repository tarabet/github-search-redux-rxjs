import 'rxjs/Rx';
import { combineEpics } from 'redux-observable';
import { FETCH_USER, FETCH_REPOS, FETCH_COMMITS, SEARCH_COMMITS, } from '../constants';
import {
    fetchUserSuccess,
    fetchUserFailed,
    fetchReposSuccess,
    fetchReposFailed,
    fetchCommitsSuccess,
    fetchCommitsFailed,
    searchCommitsSuccess,
    searchCommitsFailed,
} from '../actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';

// Actually all fetches could be done with one function with set corresponding of arguments
// DRY principle violation
export const fetchUser = actions$ =>
    actions$
        .ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON(`https://api.github.com/users/${action.payload.username}`)
                .map(user => fetchUserSuccess(user))
                .takeUntil(actions$.ofType(FETCH_USER))
                .catch(error => Observable.of(fetchUserFailed()))
        );

export const fetchRepos = actions$ =>
    actions$
        .ofType(FETCH_REPOS)
        .mergeMap(action =>
            ajax.getJSON(action.payload.reposUrl)
                .map(repos => fetchReposSuccess(repos))
                .takeUntil(actions$.ofType(FETCH_REPOS))
                .catch(error => Observable.of(fetchReposFailed()))
        );

export const fetchCommits = actions$ =>
    actions$
        .ofType(FETCH_COMMITS)
        .mergeMap(action =>
            ajax.getJSON(action.payload.commitsUrl)
                .map(commits => fetchCommitsSuccess(commits))
                .takeUntil(actions$.ofType(FETCH_COMMITS))
                .catch(error => Observable.of(fetchCommitsFailed()))
        );

export const searchCommits = actions$ =>
    actions$
        .ofType(SEARCH_COMMITS)
        .mergeMap(action =>
            ajax({
                method: "GET",
                url: action.payload.searchUrl,
                responseType: "json",
                headers: {
                    Accept: "application/vnd.github.cloak-preview",
                },
            })
                .map(resp => searchCommitsSuccess(resp.response.items))
                .takeUntil(actions$.ofType(SEARCH_COMMITS))
                .catch(error => Observable.of(searchCommitsFailed()))
        );

export default combineEpics(
    fetchUser,
    fetchRepos,
    fetchCommits,
    searchCommits,
);


