import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environment/environment'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
userName = 'sweta42';
password = 'Abc123456';
birthdate = "2017-02-01";
phoneNumber = '0188';
statusCode;
  constructor(public http: Http) {
    console.log('Hello UserServiceProvider Provider');
  }

  login(data){
    if(this.userName === data.userName && this.password === data.password)
    {
         this.statusCode = 200
    }
    else 
    {
      this.statusCode = 400
    }
    return this.statusCode;
  }


  //for rest api
  loginWithApi(data){
    let headers = new Headers({ 'Content-Type': 'application/json', 'content-language': 'en'  });
    let url = environment.APP.API_URL +  environment.APP.LOGIN_API;
    return this.http.post(url,data,headers )
      .map((res: Response) => {
        return res.json();
      })

      .catch((error: any) => {
        try {
          return (Observable.throw(error.json()));
        } catch (jsonError) {
          // If the error couldn't be parsed as JSON data
          // then it's possible the API is down or something
          // went wrong with the parsing of the successful
          // response. In any case, to keep things simple,
          // we'll just create a minimum representation of
          // a parsed error.
          let minimumViableError = {
            success: false
          };
          return (Observable.throw(minimumViableError));
        }
      });

  }
 
  security(data){
    if(this.birthdate === data.birthDate && this.phoneNumber === data.phoneNumber)
    {
         this.statusCode = 200
    }
    else 
    {
      this.statusCode = 400
    }
    return this.statusCode;
  }
  
}
