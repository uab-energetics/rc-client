import { Routes } from "@angular/router"

export const pageRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/main.module#MainModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
]
