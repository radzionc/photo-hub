import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
 
@Injectable()
export class DataService {
    constructor(private http: Http,
        private utilityService: UtilityService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }

    get(url: string, json=true){
        return this.http.get(url, this.headers()).map((response: Response) => json? response.json() : response);
    }

    post(url: string, data){
        return this.http.post(url, data, this.headers()).map((response: Response) => response.json());
    }

    delete(url: string){
        return  this.http.post(url, this.headers()).map((response: Response) => response.json());
    }

    // private helper methods
 
    private headers() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token, 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        }
    }
}