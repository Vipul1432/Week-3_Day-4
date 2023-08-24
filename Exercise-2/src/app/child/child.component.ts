import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [
    { provide: DataService, useValue: { data: 'Child Data (overridden from parent)' } }
  ]
})
export class ChildComponent {
  constructor(public dataService: DataService) {}

}
