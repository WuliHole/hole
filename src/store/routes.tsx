import * as React from 'react';
import { Route, Router } from 'react-router'
import { rootRoute } from '../routers'

export default history => (
  <Router history={ history } routes={ rootRoute }></Router>
)
