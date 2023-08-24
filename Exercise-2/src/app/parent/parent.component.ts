import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  providers: [DataService]
})
export class ParentComponent {
  constructor(public dataService: DataService) {}
}
