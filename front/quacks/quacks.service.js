import ApiService from '../common/api.service';

export default class QuacksService extends ApiService {
  constructor($http) {
    super($http);
    this.url = 'http://localhost:4000/quack/';
  }
}