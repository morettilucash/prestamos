import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'form-clientes',
    loadChildren: () => import('./pages/clientes/form-cliente/form-cliente.module').then(m => m.FormClientePageModule)
  },
  {
    path: 'prestamos',
    loadChildren: () => import('./pages/prestamos/prestamos.module').then(m => m.PrestamosPageModule)
  },
  {
    path: 'prestamos/cliente/:id',
    loadChildren: () => import('./pages/prestamos/prestamos.module').then(m => m.PrestamosPageModule)
  },
  {
    path: 'prestamos/detalles/:id',
    loadChildren: () => import('./pages/prestamos/prestamos-detalles/prestamos-detalles.module')
      .then(m => m.PrestamosDetallesPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then(m => m.PagosPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then(m => m.EstadisticasPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then(m => m.ConfiguracionesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
