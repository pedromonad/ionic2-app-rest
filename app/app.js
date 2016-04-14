import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {UserPage} from './pages/user/user';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.home = HomePage;
    this.user = UserPage;
    this.default = HomePage;


    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(option){
    this.default = option;
  }
}
