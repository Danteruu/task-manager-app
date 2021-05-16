import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListViewComponent } from './pages/task-list-view/task-list-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { TaskManagerService } from './services/task-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    TaskManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
