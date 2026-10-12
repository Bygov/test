import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';
import CatalogPage, { catalogLoader } from './pages/CatalogPage.jsx';
import ProductPage, { productLoader } from './pages/ProductPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <CatalogPage />, loader: catalogLoader },
          { path: 'product/:id', element: <ProductPage />, loader: productLoader },
          { path: 'favorites', element: <FavoritesPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
