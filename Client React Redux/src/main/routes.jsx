import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import App from './app'
import Patient from '../patient/patient'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Patient} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)