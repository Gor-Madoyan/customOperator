import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, Subscription} from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-goperator',
  templateUrl: './goperator.component.html',
  styleUrls: ['./goperator.component.css']
})
export class GoperatorComponent implements OnInit {

  constructor() { }
 

producer = of(1, 2, undefined, 3, null)
myOperator() {
  return function<T>(source: Observable<T>): Observable<T> {
    return new Observable(subscriber => {
      const subscription = source.subscribe({
        next(value) {
          if(value !== undefined && value !== null) {
            subscriber.next(value);
          }
        }
      });
      return () => subscription.unsubscribe();
    });
  }
}

  ngOnInit(): void {
    this.producer.pipe(this.myOperator(),map((val)=>val))
    .subscribe(value => console.log(value));
  }
}

