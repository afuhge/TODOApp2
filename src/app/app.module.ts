import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import {TodosModule} from './todos/todos.module';
import {UsersModule} from './users/users.module';
import {PageNotFoundModule} from './page-not-found/page-not-found.module';
import {FooterModule} from './footer/footer.module';
import {DragDropModule} from '@angular/cdk/drag-drop';



const routes: Routes = [
  {
    path: ':id',
    children : [
          {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module')
              .then((m: { DashboardModule: DashboardModule }) => m.DashboardModule),
          },
          {
            path: 'todos',
            loadChildren: () => import('./todos/todos.module')
              .then((m: { TodosModule: TodosModule }) => m.TodosModule),
          },
          {
            path: 'users',
            loadChildren: () => import('./users/users.module')
              .then((m: {UsersModule: UsersModule }) => m.UsersModule),
          },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module')
          .then((m: { LoginModule: LoginModule }) => m.LoginModule),
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module')
      .then((m: {PageNotFoundModule: PageNotFoundModule }) => m.PageNotFoundModule),
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FooterModule,
    RouterModule.forRoot(routes),
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
