import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface USERS {
  InstallDate: String;
  ComponentOk: Boolean;
  DeviceTypeHebrew: String;
  DeviceId: Number;
  DeviceType: String;
  WebSiteDeviceName: String;
  LastReportDate: Date;
  Picture: String;
  ManufacturerName: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  newDevice:any;
  title = 'Read A JSON File From Assets';
  users: any;
  isComponentOk:boolean | undefined;

  countOk:Number = 0;
  countNotOk:Number = 0;
  all:Number = 0

  usersDevices:number=0;

  constructor(private http: HttpClient){
    console.log(this.users);
  }

  public ngOnInit(): void {
    const url: string = '/assets/sensors.json';
    this.http.get(url).subscribe((response) => {
      this.users = response;
      this.countOk = this.users.filter((n: { ComponentOk: any; }) => n.ComponentOk).length;
      this.countNotOk = this.users.filter((n: { ComponentOk: any; }) => !n.ComponentOk).length;
      this.all = Number(this.countOk) + Number(this.countNotOk);
    });
  }

  public updateStatus(index: number){
    this.isComponentOk = this.users[index].ComponentOk
    if(this.isComponentOk){
      this.users[index].ComponentOk = false;
    }
    else{
      this.users[index].ComponentOk = true;
    }

    this.countOk = this.users.filter((n: { ComponentOk: any; }) => n.ComponentOk).length;
    this.countNotOk = this.users.filter((n: { ComponentOk: any; }) => !n.ComponentOk).length;
    this.all = Number(this.countOk) + Number(this.countNotOk);
  }

  addNewDevice(){
    this.usersDevices = this.users.length;
    this.newDevice = this.users;

    this.newDevice.InstallDate = '';
    this.newDevice.ComponentOk = false;
    this.newDevice.DeviceTypeHebrew = 'התקן חדש';
    this.newDevice.DeviceId = Math.floor(Math.random() * (1000 - 9999 + 1) + 9999);
    this.newDevice.DeviceType = 'new device type';
    this.newDevice.WebSiteDeviceName = 'התקן חדש';
    this.newDevice.LastReportDate = Date.now();
    this.newDevice.InstallDate = Date.now();
    this.newDevice.ManufacturerName = 'ManufacturerName';

    this.users.push(this.newDevice);

    this.countOk = this.users.filter((n: { ComponentOk: any; }) => n.ComponentOk).length;
    this.countNotOk = this.users.filter((n: { ComponentOk: any; }) => !n.ComponentOk).length;
    this.all = Number(this.countOk) + Number(this.countNotOk);
  }

  deleteLastDevice(){
    this.users.splice(-1);

    this.countOk = this.users.filter((n: { ComponentOk: any; }) => n.ComponentOk).length;
    this.countNotOk = this.users.filter((n: { ComponentOk: any; }) => !n.ComponentOk).length;
    this.all = Number(this.countOk) + Number(this.countNotOk);
  }
}