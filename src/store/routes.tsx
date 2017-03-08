import * as React from 'react';
import { IndexRoute, Route, Router } from 'react-router'
import { rootRoute } from '../routers'

export default history => (
  <Router history={ history } routes={ rootRoute }></Router>
)
