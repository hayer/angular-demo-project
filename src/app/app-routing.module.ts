import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full"
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "heroes",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/hero/hero.module").then(m => m.HeroModule)
  },
  {
    path: "villains",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/villain/villain.module").then(m => m.VillainModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
