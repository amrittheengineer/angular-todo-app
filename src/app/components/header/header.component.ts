import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = 'To-Do List';
  addTaskVisible: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((visibility) => (this.addTaskVisible = visibility));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }
}
