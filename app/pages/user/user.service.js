import {Injectable} from 'angular2/core';
import {SERVER_URL} from '../../config/config';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


let apiURL = SERVER_URL + 'users';

@Injectable()
export class UserService {
     static get parameters() {
        return [[Http]];
     }

    constructor (http) {
        this.http = http;
    }

    findAll() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(apiURL, options)
                .map(res => res.json())
                .catch(this.handleError);
    }

    insert(user) {
        let body = JSON.stringify({"name": user.name, "email": "admin2@admin.com.br", "address": "sahudashud" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(apiURL, body, options)
                      .map(res => res.json())
                      .catch(this.handleError);
    }

    update(user) {
      let body = JSON.stringify({ "name": user.name, "email": "admin2@admin.com.br", "address": "sahudashud" });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      console.log(user);
      return this.http.put(apiURL.concat('/', user._id), body, options)
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    delete(user) {
      return this.http.delete(apiURL.concat('/', user._id) )
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
