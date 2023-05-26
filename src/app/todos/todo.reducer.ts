import { createReducer, on } from '@ngrx/store';

import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Ser Spiderman'),
  new Todo('Recoger traje Iron Man'),
];

export const todoReducer = createReducer(
  initialState,
  on(crear, (state, { texto }) => [...state, new Todo(texto)] ), // return [todo1, todo2, ..., Todo('nueva tarea')]
  on(limpiarTodos, (state) => state.filter(todo => !todo.completado) ), // return [todo1, todo2, ..., Todo('nueva tarea')]
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id) ), // return todos los todo que sean diferentes al id.
  on(toggleAll, (state, { completado }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado
      }
    });
  }), // return todos los todo con el estado completado.
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }), // return un nuevo todo para el cambio de estado.
  on(editar, (state, { id, text }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text
        }
      } else {
        return todo;
      }
    });
  }), // return un nuevo todo para el cambio de texto.
);
