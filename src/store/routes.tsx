import * as React from 'react';
import { Route, Router } from 'react-router'
import { rootRoute } from '../routers'
import p from 'app/components/progress/index'

export default history => (
  <Router history={ history } onUpdate={ () => p.done() } routes={ rootRoute }></Router>
)
