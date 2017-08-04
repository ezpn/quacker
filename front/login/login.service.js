export default class LoginService {
  constructor($state, $timeout) {
    this.localStorageKey = 'photoStory.instagram.jwt';
    this.observerCallbacks = [];
    this.$state = $state;
    this.$timeout = $timeout;
    this.user = null;
    this.setIsLoggedIn(false);
  }

  setIsLoggedIn(isLoggedIn) {
    if (this.isLoggedIn != isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
      this.notify();
    }
  }

  subscribe(cb) {
    this.observerCallbacks.push(cb);
  }

  unsubscribe(cb) {
    const cbIdx = this.observerCallbacks.indexOf(cb);

    if (!~cbIdx) {
      this.observerCallbacks.remove(cbIdx);
    }
  }

  notify() {
    this.observerCallbacks.forEach((cb) => {
      return cb(this.isLoggedIn);
    })
  }

  authenticate() {
    if (!this.isLoggedIn) {
      return this.$timeout(() => this.redirectToLogin);
    }

    return Promise.resolve();
  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
    this.setIsLoggedIn(false);

    return this.$state.go('home');
  }

  redirectToLogin() {
    return this.$state.go('login');
  }

  setUser(user) {
    console.log('seti u', user);
    this.user = user;
    this.setIsLoggedIn(true);
  }

  getUser() {
    return this.user;
  }
}

LoginService.$inject = ['$state', '$timeout'];
