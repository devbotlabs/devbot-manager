/** In this file, we create a React component which incorporates components provided by material-ui */
import React from 'react'
import {render} from 'react-dom'
import Dashboard from './dashboard'
import Collection from './collection'
import CollectionItem from './collection-item'
import Register from './accounts/register'
import Login from './accounts/login'
import Settings from './settings'

//redux stuff
import {createStore, compose, combineReducers} from 'redux';

import {ReduxRouter, routerStateReducer, reduxReactRouter} from 'redux-router';

import {Route, Link} from 'react-router';
import {Provider, connect} from 'react-redux';
import {devTools} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';
import zodAppReducer from '../reducers';

import App from './app'
//
// const history = useBasename(createHistory)({
//     basename: '/zod-admin'
// })
const NoMatch = React.createClass({render () {
        return <div>not found</div>

    }
})
let Index = React.createClass({
    render() {
        return <h1>Address Book</h1>
    }
})

// Configure reducer to store state at state.router
// You can store it elsewhere by specifying a custom `routerStateSelector`
// in the store enhancer below
// Compose reduxReactRouter with other store enhancers

// Elsewhere, in a component module...

// const reducer = combineReducers({
//     router: routerStateReducer
// });

const reducer = combineReducers({
    router: routerStateReducer,
    zodAppReducer
});
const store = compose(reduxReactRouter({createHistory}), devTools())(createStore)(reducer);

console.log('-----2-------')

console.log(store)
const Root = React.createClass({

    render() {
        console.log(this)

        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter >
                        <Route path="/" component={App}>
                            <Route path="dashboard" component={Dashboard}/>
                            <Route path="collection/:cname" component={Collection}/>
                            <Route path="collection/:cname/:itemid" component={CollectionItem}/>
                            <Route path="register" component={Register}/>
                            <Route path="login" component={Login}/>
                            <Route path="settings" component={Settings}/>
                            <Route path="*" component={NoMatch}/>
                        </Route>
                    </ReduxRouter>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor}/>
                </DebugPanel>

            </div>

        );
    }
});

module.exports = Root;