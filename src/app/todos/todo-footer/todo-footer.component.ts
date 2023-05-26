import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, filtro } from 'src/app/filtro/filtro.actions';
import { Todo } from '../models/todo.model';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  public filtroActual: filtrosValidos = 'todos';
  public filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  public pendientes: number = 0;
  public todos: Todo[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro );
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
      this.todos = state.todos;
    });
  }

  public cambiarFiltro(filtroSelected: filtrosValidos) {
    this.store.dispatch(filtro({filtro: filtroSelected}));
  }

  public borrarCompletados() {
    this.store.dispatch(limpiarTodos())
  }

}
