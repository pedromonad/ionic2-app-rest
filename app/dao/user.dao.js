import {Storage, SqlStorage} from 'ionic-angular';


export class UserDAO {
  constructor(){
    let storage = new Storage(SqlStorage);
    storage.query("CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)")
      .then((data) => {
        console.log("tabela criada");
      },(error) => {
        console.log("erro na criação da tabela " + JSON.stringify(error.err));
      });
  }

  getList(successCallback){

    let storage = new Storage(SqlStorage);
    storage.query("SELECT * FROM user")
      .then((data) => {
        let list = [];
        for(var i = 0; i < data.res.rows.length; i++){
          let item = {};
          item.id = data.res.rows.item(i).id;
          item.name = data.res.rows.item(i).name;
          list.push(item);
          successCallback(list);
        }

        console.log("sucesos ao inserir");
      }, (error) => {
        console.log("erro ao inserir");
      });
  }

  insert(user, successCallback){
    let storage = new Storage(SqlStorage);
    storage.query("INSERT INTO user (name) VALUES (?)", [user.name])
      .then((data) => {
        user.id = data.res.insertId;
        successCallback(user);
        console.log("sucesos ao inserir");
      }, (error) => {
        console.log("erro ao inserir");
      });
  }

  edit(user,successCallback){
    let storage = new Storage(SqlStorage);
    storage.query("UPDATE user SET name=? WHERE id=?", [user.name, user.id ])
      .then((data) => {
        successCallback(user);
        console.log("sucesos no update");
      }, (error) => {
        console.log("erro update");
      });
  }

  delete(user, successCallback){
    let storage = new Storage(SqlStorage);
    storage.query("DELETE FROM user WHERE id=?", [user.id])
      .then((data) => {
        successCallback(user);
        console.log("sucesos no delete");
      }, (error) => {
        console.log("erro delete");
      });
  }


}
