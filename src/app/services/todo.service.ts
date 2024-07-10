import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Task[] = [];
  private todosSubject = new BehaviorSubject<Task[]>(this.todos);

  constructor() {
    this.loadTodos();
  }

  private loadTodos() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.todos = JSON.parse(todos);
      this.todosSubject.next(this.todos);
    }
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos() {
    return this.todosSubject.asObservable();
  }

  addTodo(task: Task) {
    this.todos.push(task);
    this.todosSubject.next(this.todos);
    this.saveTodos();
  }

  toggleTodoCompletion(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosSubject.next(this.todos);
      this.saveTodos();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.todosSubject.next(this.todos);
    this.saveTodos();
  }
}
