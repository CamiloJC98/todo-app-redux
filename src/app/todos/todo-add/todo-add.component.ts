import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent {

  public txtInput: FormControl;

  constructor(private store: Store<AppState>) {
    this.txtInput = new FormControl('', Validators.required);
  }

  public agregar() {
    if (this.txtInput.invalid) { return; }
    this.store.dispatch( actions.crear(this.txtInput.value) );
    this.txtInput.reset();
  }

}
