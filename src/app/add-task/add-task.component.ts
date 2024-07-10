import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Task } from '../model/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  title: string = '';
  isModalOpen: boolean = false;

  constructor(private todoService: TodoService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addTodo() {
    if (this.title.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.title,
        completed: false
      };
      this.todoService.addTodo(newTask);
      this.title = '';
      this.closeModal();
    }
  }
}
