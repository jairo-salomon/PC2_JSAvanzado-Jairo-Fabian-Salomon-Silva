import { Routes } from '@angular/router';
import { Lista } from './lista-estudiantes/lista-estudiantes';
import { Detalle } from './detalle-estudiante/detalle-estudiante';

export const routes: Routes = [
  { path: '', component: Lista },
  { path: 'detalle/:id', component: Detalle }
];