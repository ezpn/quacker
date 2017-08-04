import ApiService from '../common/api.service';

export default class SignupService extends ApiService {
  constructor($http) {
    super($http);
    this.url = 'http://localhost:4000/auth/passport/signup';
  }
}