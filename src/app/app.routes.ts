import { Routes } from '@angular/router';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ChartComponent} from "@swimlane/ngx-charts";
import {VerticalBarChartComponent} from "./components/vertical-bar-chart/vertical-bar-chart.component";
import {BoardComponent} from "./components/board/board.component";
import {RegComponent} from "./components/reg/reg.component";
import {AppComponent} from "./app.component";
import {AuthComponent} from "./components/auth/auth.component";
import {PersonalAccountPageComponent} from "./pages/personal-account-page/personal-account-page.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {TestPageComponent} from "./pages/test-page/test-page.component";



const mainChildrenRoutes: Routes = [
    { path: "board/:id", component: BoardComponent},
    { path: "stats", component: VerticalBarChartComponent}
];

const authChildrenRoutes: Routes = [
    { path: "auth", component: AuthComponent},
    { path: "reg", component: RegComponent}
];

export const routes: Routes = [
    {path:'', component: WelcomePageComponent},
    {path:'main', component: MainPageComponent, children: mainChildrenRoutes},
    {path:'enter', component: AuthPageComponent, children: authChildrenRoutes},
    {path:'edit-acc', component: PersonalAccountPageComponent},
    {path:'test', component: TestPageComponent},
    {path:'**', component: NotFoundPageComponent}
];
