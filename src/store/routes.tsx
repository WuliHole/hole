import * as React from 'react';
const { IndexRoute, Route } = require('react-router');

import App from '../containers/app';
import IndexPage from '../containers/index-page';
import AboutPage from '../containers/about-page';
import ArticlePage from '../containers/article-page';


export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ IndexPage }/>
    <Route path="article" component={ ArticlePage }/>
    <Route path="about" component={ AboutPage }/>
  </Route>
);
