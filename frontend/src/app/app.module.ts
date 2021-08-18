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
import {RegisterModule} from './pages/register/register.module';
import { LoggedInGuard } from './guards/logged-in-guard';
import { NotLoggedInGuard } from './guards/not-logged-in-guard';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module')
          .then((m: { DashboardModule: DashboardModule }) => m.DashboardModule),
        canActivate: [LoggedInGuard ]
      },
      {
        path: 'todos',
        loadChildren: () => import('./pages/todos/todos.module')
          .then((m: { TodosModule: TodosModule }) => m.TodosModule),
        canActivate: [LoggedInGuard ]
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module')
          .then((m: { UsersModule: UsersModule }) => m.UsersModule),
        canActivate: [LoggedInGuard ]
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
        canActivate: [NotLoggedInGuard ]
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module')
          .then((m: { RegisterModule: RegisterModule }) => m.RegisterModule),
        canActivate: [NotLoggedInGuard ]
      },
      {
        path: '**',
        loadChildren: () => import('./pages/page-not-found/page-not-found.module')
          .then((m: { PageNotFoundModule: PageNotFoundModule }) => m.PageNotFoundModule),
      },
    ]
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  bootstrap: [AppComponent],
  providers: [UserService, LocalStorageService, LoggedInGuard, NotLoggedInGuard,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'de'},
  ],
})
export class AppModule {
}
