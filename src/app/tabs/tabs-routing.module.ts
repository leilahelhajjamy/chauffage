import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../services/authguard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },

      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'tab4',
        loadChildren: () =>
          import('../tab4/tab4.module').then((m) => m.Tab4PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },

  {
    path: 'configuration-manuelle',
    loadChildren: () =>
      import('../configuration-manuelle/configuration-manuelle.module').then(
        (m) => m.ConfigurationManuellePageModule
      ),
    canActivate: [AuthguardService],
  },
  {
    path: 'tab2',
    loadChildren: () =>
      import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
    canActivate: [AuthguardService],
  },
  {
    path: 'tab3',
    loadChildren: () =>
      import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
    canActivate: [AuthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
