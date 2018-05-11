import { Routes } from "@angular/router"
import {AuthGuardService} from '../core/auth/auth-guard.service'

export const pageRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        loadChildren: './main/main.module#MainModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
]
