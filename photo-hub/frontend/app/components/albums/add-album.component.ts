import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbum } from '../../models/album';


@Component({
    selector: 'add-album',
    templateUrl: 'static/app/components/albums/add-album.component.html',
})
export class AddAlbumComponent implements OnInit{
    private _title: string;
    private _userId: number;

    ngOnInit(){
        this._userId = this.dataService.getCurrentUserId();
    }
    constructor(public dataService: DataService,
                public notificationService: NotificationService,
                public router: Router) { }

    create(): void {
        this.dataService.createAlbum(this._title).subscribe((album: IAlbum) =>{
                this.notificationService.printSuccessMessage(this._title + " album created!");
                this.router.navigate(['/albums'], {queryParams: {user_id: this.dataService.getCurrentUserId()}});
            },
            error=>{
                this.notificationService.printErrorMessage('Failed to create ' + this._title + ' album : ' + error)
            })
    }
}