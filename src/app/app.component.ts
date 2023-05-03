import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'unit-test';

  showMessage(msg: string) {
    return msg;
  }

  calculation(num1: number, num2: number) {
    let sum = num1 + num2;
    return sum;
  }
}
