import React, {
    Component,
    PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, combineReducers} from 'redux';
import Dashboard from './dashboard'

import {ReduxRouter, routerStateReducer, reduxReactRouter} from 'redux-router';

import {Route, Link} from 'react-router';
import {Provider, connect} from 'react-redux';
import {devTools} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';
import App from './app'
import zodAppReducer from '../reducers';

class Parent extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        return (
            <div>
                <h2>Parent</h2>
                {this.props.children}
            </div>
        );
    }
}

class Child extends Component {
    render() {
        return (
            <div>
                <h2>Child</h2>
            </div>
        );
    }
}

const reducer = combineReducers({
    router: routerStateReducer,
    zodAppReducer
});

const store = compose(reduxReactRouter({createHistory}), devTools())(createStore)(reducer);

let unsubscribe = store.subscribe(() => {});

class Root extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter>
                        <Route path="/" component={App}>
                            <Route path="dashboard" component={Dashboard}/>

                            <Route path="parent" component={Parent}>
                                <Route path="child" component={Child}/>
                                <Route path="child/:id" component={Child}/>
                            </Route>
                        </Route>
                    </ReduxRouter>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} select={state => state} monitor={LogMonitor}/>
                </DebugPanel>
            </div>
        );
    }
}

module.exports = Root;
