export default class NavController {
  constructor($scope, loginService) {
    this.isLoggedIn = loginService.isLoggedIn;
    this.user = {id: 0, username: 'anonymous'};

    loginService.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.user = loginService.getUser();
      console.log('u', this.user);
    });
  }
}

NavController.$inject = ['$scope', 'loginService'];
