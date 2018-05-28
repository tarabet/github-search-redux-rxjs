import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ListCommits } from "./components/list-commits";
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import {
    createStore,
    compose,
    applyMiddleware,
} from "redux";
import createHistory from "history/createBrowserHistory";
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from "react-router-redux";

import reducer from "./reducers";
import { createEpicMiddleware } from "redux-observable";
import epics from "./epics";

const epicMiddleware = createEpicMiddleware(epics);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware, middleware)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={App}/>
                <Route exact path="/commits/:repoName" component={ListCommits}/>
            </div>
        </ConnectedRouter>
    </Provider>,  document.getElementById('root'));
registerServiceWorker();
