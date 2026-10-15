import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, DecimalPipe],
  template: `
    <div class="container mt-4">
      @if (estudiante) {
        <div class="card" style="max-width: 500px;">
          <div class="card-header">
            <h4 class="mb-0">{{ estudiante.nombre }}</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Suma:</strong> {{ suma }}</li>
            <li class="list-group-item"><strong>Promedio:</strong> {{ promedio | number: '1.2-2' }}</li>
            <li class="list-group-item"><strong>Estado académico:</strong> {{ estado }}</li>
            <li class="list-group-item"><strong>Observación:</strong> {{ observacion }}</li>
          </ul>
          <div class="card-body">
            <a routerLink="/" class="btn btn-secondary btn-sm">Volver</a>
          </div>
        </div>
      }
    </div>
  `
})
export class Detalle implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  estudiante: any;
  suma = 0;
  promedio = 0;
  estado = '';
  observacion = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.http
      .get<any[]>('https://careli2021.github.io/api_examen/api/estudiante.json')
      .subscribe(lista => {
        this.estudiante = lista.find(e => e.id === id);

        if (this.estudiante) {
          this.suma = this.estudiante.nota1 + this.estudiante.nota2 + this.estudiante.nota3;
          this.promedio = this.suma / 3;
          this.estado = this.promedio >= 13 ? 'Aprobado' : 'Desaprobado';

          if (this.promedio >= 17) {
            this.observacion = 'Excelente';
          } else if (this.promedio >= 13) {
            this.observacion = 'Regular';
          } else {
            this.observacion = 'En riesgo';
          }
        }

        this.cdr.detectChanges();
      });
  }
}