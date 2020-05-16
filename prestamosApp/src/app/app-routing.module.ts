import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prestamos',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'prestamos',
    loadChildren: () => import('./pages/prestamos/prestamos.module').then( m => m.PrestamosPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'folder/estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'folder/configuraciones',
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
