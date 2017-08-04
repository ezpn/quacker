routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('quacks', {
      url: '/quacks',
      template: require('./quacks.html'),
      controller: 'QuacksController',
      controllerAs: 'quacks',
    });
}
