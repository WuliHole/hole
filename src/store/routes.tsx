import * as React from 'react';
const { IndexRoute, Route } = require('react-router');

import App from '../containers/app';
import IndexPage from '../containers/index-page';
import AboutPage from '../containers/about-page';
import ArticleListPage from '../containers/article-list-page';
import ReadingPage from '../containers/reading-page'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ IndexPage } />
    <Route path="article" component={ ArticleListPage } />
    <Route path="@:userName/:articleTitle" component={ ReadingPage } />
    <Route path="about" component={ AboutPage } />
  </Route>
);
