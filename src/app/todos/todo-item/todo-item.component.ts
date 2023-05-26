import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { toggle, editar, borrar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() public todo: Todo;
  @ViewChild('inputFisico') public txtInputFisico!: ElementRef;

  public chkCompletado!: FormControl;
  public txtInput!: FormControl;
  public editando: boolean = false;

  constructor(private store: Store<AppState>) {
    this.todo = new Todo('');
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      console.log(valor);
      this.store.dispatch(toggle({ id: this.todo.id }));
    });
  }

  public editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  public terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.text) {
      return;
    }

    this.store.dispatch(editar({ id: this.todo.id, text: this.txtInput.value}))
  }

  public borrar() {
    this.store.dispatch(borrar({ id: this.todo.id }));
  }

}
