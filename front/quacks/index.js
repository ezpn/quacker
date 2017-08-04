import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import routing from './quacks.routes';
import QuacksController from './quacks.controller';
import QuacksService from './quacks.service';

export default angular.module('app.quacks', [uirouter])
  .config(routing)
  .service('quacksService', QuacksService)
  .controller('QuacksController', QuacksController)
  .name;
