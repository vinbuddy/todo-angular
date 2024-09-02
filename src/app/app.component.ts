import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule, TodoComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'todo-angular';

    todos: string[] = [];
    newTodo = '';
    @ViewChild('todoInput') todoInputRef!: ElementRef<HTMLInputElement>;

    ngOnInit(): void {
        // Run on component initialization
        // Load todos from local storage
        const savedTodos = localStorage.getItem('todos');

        if (savedTodos) {
            this.todos = JSON.parse(savedTodos);
        }
    }

    saveTodoList(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo() {
        const value = this.newTodo.trim();
        console.log('value: ', value);

        if (value) {
            this.todos.push(value);
            this.newTodo = '';

            this.todoInputRef.nativeElement.focus();
            this.todoInputRef.nativeElement.value = '';
            this.saveTodoList();
        }
    }

    deleteTodo(index: number) {
        this.todos.splice(index, 1);
        this.saveTodoList();
    }

    editTodo({ index, todo }: { index: number; todo: string }) {
        this.todos[index] = todo;
        this.saveTodoList();
    }
}
