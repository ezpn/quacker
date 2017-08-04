routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      template: require('./login.html'),
      controller: 'LoginController',
      controllerAs: 'login',
    })
    .state('signup', {
      url: '/signup',
      template: require('./signup.html'),
      controller: 'SignupController',
      controllerAs: 'signup',
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutController',
      controllerAs: 'logout',
    });
}
