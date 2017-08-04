export default class SignupController {
  constructor($state, signupService, loginService) {
    this.$state = $state;
    this.signupService = signupService;
    this.loginService = loginService;
    this.user = {};
    this.register = {};
  }

  submit(user) {
    this.user = angular.copy(user);
    console.log('posting', this.user);
    const self = this;
    this.signupService.post(this.user)
      .then(res => {
        self.loginService.setUser(res.data);
        return self.$state.go('quacks');
      });
  }
}

SignupController.$inject = ['$state', 'signupService', 'loginService'];
