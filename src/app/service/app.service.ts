import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http: HttpClient) {
  }


  public cadastrarUsuario(formulario: any) {
    return this.http.post('http://localhost:8080', formulario);

  }
}
