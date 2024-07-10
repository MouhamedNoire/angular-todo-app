import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import { TodoService } from '../services/todo.service';
import { AddTaskComponent } from "../add-task/add-task.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
    imports: [AddTaskComponent,CommonModule]
})
export class TodoListComponent implements OnInit{
  todos: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  toggleCompletion(id: number) {
    this.todoService.toggleTodoCompletion(id);
  }

  deleteTodo(id:number){
    this.todoService.deleteTodo(id);
  }
}
