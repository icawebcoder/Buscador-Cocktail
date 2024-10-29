import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Layout from './layouts/Layout'
import { lazy, Suspense } from 'react'

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route
                        path='/'
                        element={<IndexPage />}
                        index
                    />
                    <Route
                        path='/favoritos'
                        element={
                            <Suspense fallback='Cargando...'>
                                <FavoritesPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
