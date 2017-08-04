import _ from 'lodash';
import angular from 'angular';
import satellizer from 'satellizer'
import routing from './app.routing';
import auth from './app.auth';
import uirouter from '@uirouter/angularjs';
import {ngPassportHash} from 'angular-passport';
import ngCookies from 'angular-cookies';

import common from './common';
import login from './login';
import home from './home';
import quacks from './quacks';

ngPassportHash.constant('NGPASSPORT_CONF_HASH', {
    API_BASE_URL: 'http://localhost:4000',
    API_AUTH_PATHNAME: '/auth/passport/localstrategy',
    URL_AFTER_SUCCESSFUL_LOGIN: '/quacks',
    URL_AFTER_LOGOUT: '/'
});

const quackerApp = angular.module('quackerApp', [
  uirouter,
  ngCookies,
  satellizer,
  ngPassportHash.name,
  login,
  common,
  home,
  quacks,
])
  .config(routing)
  .config(auth);
