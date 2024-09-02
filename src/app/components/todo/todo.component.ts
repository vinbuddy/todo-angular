import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './todo.component.html',
    styleUrl: './todo.component.scss',
})
export class TodoComponent {
    @Input() todo: string = '';
    @Input() index: number = 0;
    isEdited: boolean = false;

    // number is type of index
    @Output() onDelete = new EventEmitter<number>();

    // { index: number; todo: string } is type of todo for editing
    @Output() onEdit = new EventEmitter<{ index: number; todo: string }>();

    enableEdit() {
        this.isEdited = true;
    }

    disableEdit() {
        this.isEdited = false;
    }

    editTodo() {
        this.onEdit.emit({ index: this.index, todo: this.todo });

        this.isEdited = false;
    }

    deleteTodo() {
        this.onDelete.emit(this.index);
    }
}
