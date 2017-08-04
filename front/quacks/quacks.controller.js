export default class QuacksController {
  constructor(quacksService, loginService) {
    this.quacksService = quacksService;
    this.loginService = loginService;
    this.quacks = [];
    this.getQuacks();
    this.isLoggedIn = loginService.isLoggedIn;
    loginService.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  postQuack(content) {
    console.log('sending', content);
    const user = this.loginService.getUser();

    if (user == null) {
      throw new Error('User must be signed in');
    }

    const msg = {
      content: content,
      user: user.id,
    };

    const self = this;
    this.quacksService.post(msg)
      .then(() => {
        const quack = {
          User: user,
          content: msg.content
        };
        self.quacks.push(quack);
      });
  }

  getQuacks() {
    this.quacksService.getAll()
      .then(res => {
        console.log('res', res);
        this.quacks = res.data;
      });
  }
}

QuacksController.$inject = ['quacksService', 'loginService'];