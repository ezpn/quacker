import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import routing from './login.routes';
import LoginController from './login.controller';
import LogoutController from './logout.controller';
import SignupController from './signup.controller';
import LoginService from './login.service';
import SignupService from './signup.service';

export default angular.module('app.login', [uirouter])
  .config(routing)
  .service('loginService', LoginService)
  .service('signupService', SignupService)
  .controller('LoginController', LoginController)
  .controller('LogoutController', LogoutController)
  .controller('SignupController', SignupController)
  .name;
