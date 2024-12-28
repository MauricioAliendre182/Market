import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {
  // Let's implement the interface OnExit() here
  // and implement the logic here (use confirm())
  onExit() {
    const rta = confirm('Are you sure to leave this page?')
    return rta;
  }
}
