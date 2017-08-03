import _ from 'lodash';
import angular from 'angular';
import satellizer from 'satellizer'
import routing from './app.routing';
import auth from './app.auth';
import uirouter from '@uirouter/angularjs';

import common from './common';
import login from './login';
import home from './home';

const photostoryApp = angular.module('photostoryApp', [
  uirouter,
  satellizer,
  login,
  common,
  home,
])
  .config(routing)
  .config(auth);
