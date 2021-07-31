import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardModule} from './pages/dashboard/dashboard.module';
import {LoginModule} from './pages/login/login.module';
import {TodosModule} from './pages/todos/todos.module';
import {UsersModule} from './pages/users/users.module';
import {PageNotFoundModule} from './pages/page-not-found/page-not-found.module';
import {FooterModule} from './parts/footer/footer.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LandingPageModule} from './pages/landing-page/landing-page.module';
import {NotifierModule} from './parts/notifier/notifier.module';
import {ModalWrapperModule} from './libs/modal-wrapper/modal-wrapper.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';


const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module')
          .then((m: { DashboardModule: DashboardModule }) => m.DashboardModule),
      },
      {
        path: 'todos',
        loadChildren: () => import('./pages/todos/todos.module')
          .then((m: { TodosModule: TodosModule }) => m.TodosModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
          .then((m: { UsersModule: UsersModule }) => m.UsersModule),
      },
      {
        path: 'landing-page',
        loadChildren: () => import('./pages/landing-page/landing-page.module')
          .then((m: { LandingPageModule: LandingPageModule }) => m.LandingPageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
          .then((m: { LoginModule: LoginModule }) => m.LoginModule),
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module')
      .then((m: { PageNotFoundModule: PageNotFoundModule }) => m.PageNotFoundModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FooterModule,
    RouterModule.forRoot(routes),
    DragDropModule,
    NotifierModule,
    ModalWrapperModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [ UserService, LocalStorageService ],
})
export class AppModule {
}
