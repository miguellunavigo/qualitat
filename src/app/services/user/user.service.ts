import { USER_INFORMATION_MOCK, HASH_USER_INFORMATION_MOCK } from 'src/app/common/mocks/user.mocks';
import { IUserInformation, IUserHashInformation } from 'src/app/common/interfaces/user.interface';
import { HttpService } from 'src/app/services/http/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TitleCasePipe } from 'src/app/pipes/title-case/title-case.pipes';
import { HttpHeaders } from '@angular/common/http';

// import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInformation!: IUserInformation;

  constructor(
    private http: HttpService,
  ) { }

  public async perfilesUsuario(idUsuario: string): Promise<any> {
    try {
      let headers = new HttpHeaders({
        'accept': 'application/json'
      }); 
      headers = new HttpHeaders().set('Content-Type', "application/json");
      const url = environment.BASE_BACKEND_WORKER + 'Services/ComboPerfilUsuario?idUsuario='+idUsuario;
      const perfiles = await this.http.post(url,"",headers).toPromise();
      return perfiles;
    } catch (e:any) {
      console.log(e);      
      throw(e);
    }
  }


  public getFullName() {
    const name = this.userInformation.names ?
    ' ' + new TitleCasePipe().transform(this.userInformation.names.split(' ')[0]) : '';
    const lastName = this.userInformation.lastName ?
    ' ' + new TitleCasePipe().transform(this.userInformation.lastName) : '';
    return name + lastName;
  }
  public async loadUserInformation(user: any, userDNI: string) {
    const hashToken = ''; // this.authService.currentToken.refreshToken;  TODO: hashear token con blake2

   /* this.firebaseService.addSefEfexServiceResponse(
      {
        token: hashToken,
        sessionDNI: userDNI,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        customerId: user.customerId,
        userEmail: user.email,
        userName:  user.names.toUpperCase(),
        userLastName: user.lastName.toUpperCase(),
        mobileNumber: user.mobileNumber,
        device: deviceInformation
      },
      'userInformationResponses');*/
  }

}
