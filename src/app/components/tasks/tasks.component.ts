import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  addTaskVisible: boolean = false;
  subscription: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((visibility) => (this.addTaskVisible = visibility));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteTask(task: Task): void {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  onAddTask(task: Task): void {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  onToggleReminder(task: Task): void {
    this.taskService
      .updateTask({ ...task, reminder: !task.reminder })
      .subscribe(() => {
        task.reminder = !task.reminder;
      });
  }
}
