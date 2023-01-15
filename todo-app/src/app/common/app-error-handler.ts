import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler{
  handleError(error: any): void {
    alert('An un expected Error occured');
    console.log(error);
  }

}
