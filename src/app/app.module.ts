import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { CoreModule } from "./core/core.module";
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, CallbackComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
