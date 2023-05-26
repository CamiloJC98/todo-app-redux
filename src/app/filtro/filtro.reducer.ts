import { Action, createReducer, on } from '@ngrx/store';
import { filtro, filtrosValidos } from './filtro.actions';

export const filtros: filtrosValidos = 'todos';

export const filtroReducer = createReducer<filtrosValidos, Action>(
  filtros,
  on(filtro, (state, { filtro }) => filtro),
);
