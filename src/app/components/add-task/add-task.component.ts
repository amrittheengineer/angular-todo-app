import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  text: string;
  day: string;
  reminder: boolean = false;

  @Output() onAddTask = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);
    // @emit task

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
