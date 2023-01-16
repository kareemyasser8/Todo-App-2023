import { AppError } from './../common/app-error';
import { NotFoundError } from './../common/not-found-error';
import { BadRequestError } from './../common/bad-request-error';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

export class DataService {

  constructor(private url: string, private http: HttpClient) {

  }



  getAll(): Observable<Object>{
    return this.http.get(this.url).pipe(
      map((response=>{return response})),
      catchError(this.handleError)
    )
  }


  create(recource) : Observable<Object>{
    return this.http.post(this.url, recource).pipe(
      map(response=>{return response}),
      catchError(this.handleError)
    )

  }

  update(item:any) : Observable<Object>{
    return this.http.patch(this.url + '/' + item.id, item).pipe(
      map((response=>{ return response})),
      catchError(this.handleError)
    )
  }

  delete(item:any) : Observable<Object>{
    return this.http.delete(this.url + '/'+ item.id).pipe(
      map((response=>{ return response})),
      catchError(this.handleError)
    )
  }


  private handleError(error:Response){
    if(error.status == 400)
      return throwError(()=> new BadRequestError(error))

    if(error.status == 404)
      return throwError(()=> new NotFoundError(error))

    return throwError(()=>new AppError(error))

  }


}
