import { createBrowserRouter } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'
import About from './routes/About'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Post from './routes/Post'
import Tags from './routes/Tags'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tags', element: <Tags /> },
      { path: 'about', element: <About /> },
      { path: 'posts/:slug', element: <Post /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
