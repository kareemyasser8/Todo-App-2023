import { HttpClient } from '@angular/common/http';

export class DataService {

  constructor(private url: string, private http: HttpClient) {

  }

  getAll() {
    return this.http.get(this.url);
  }

  create(item) {
    return this.http.post(this.url, item)
  }

  update(item:any) {
    return this.http.patch(this.url + '/' + item.id, item)
  }

  delete(item:any){
    return this.http.delete(this.url + '/'+ item.id)
  }


}
