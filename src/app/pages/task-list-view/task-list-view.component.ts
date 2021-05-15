import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {
  faPlus = faPlus;
  constructor() { }

  ngOnInit(): void {
  }

  taskClick(): void {
    console.log('clicked');
  }
}
