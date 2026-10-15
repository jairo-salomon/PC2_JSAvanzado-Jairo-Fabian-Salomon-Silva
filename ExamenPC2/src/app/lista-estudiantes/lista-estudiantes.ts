import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [RouterLink],
  template: `
    <div class="container mt-4">
      <h2>Reporte de estudiantes</h2>

      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          @for (e of estudiantes; track e.id) {
            <tr>
              <td>{{ e.nombre }}</td>
              <td>{{ e.nota1 }}</td>
              <td>{{ e.nota2 }}</td>
              <td>{{ e.nota3 }}</td>
              <td>
                <a class="btn btn-primary btn-sm" [routerLink]="['/detalle', e.id]">Detalle</a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class Lista implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  estudiantes: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('https://careli2021.github.io/api_examen/api/estudiante.json')
      .subscribe(data => {
        this.estudiantes = data;
        this.cdr.detectChanges();
      });
  }
}