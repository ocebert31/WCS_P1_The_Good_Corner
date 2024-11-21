import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage.tsx';
import AdPage from './pages/AdPage.tsx';
import Exercice1 from './components/Exercice/Exercice1/ToDoList.tsx';
import NewAdPage from './pages/NewAdPage.tsx';

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/ads/view/:id",
                element: <AdPage/>
            },
            {
                path: "/exercice1",
                element: <Exercice1/>
            },
            {
                path: "/ads/create",
                element: <NewAdPage/>
            },
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
