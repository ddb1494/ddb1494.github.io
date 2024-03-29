import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Navbar from './Navbar';
import NotFound from '@page/NotFound';
import Index from './page/Index';

// auth

const Worker = lazy(() => import('@page/Worker'));

// @page/React/
const Transition = lazy(() => import('@page/React/Transition'));
const DeferredValue = lazy(() => import('@page/React/DeferredValue'));
const Suspense_ = lazy(() => import('@page/React/Suspense'));
const ContextProvider = lazy(() => import('@page/React/ContextProvider'));
const Chroma = lazy(() => import('@page/Chroma'));

const MyRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <nav>
          <Navbar />
        </nav>

        <Routes>
          {/* <Route index element={<Navigate replace to="/chroma" />} /> */}
          <Route index element={<Index />} />
          <Route path="/chroma" element={<Chroma />} />
          <Route path="/worker" element={<Worker />} />
          <Route path="/react" element={<Outlet />}>
            <Route path="transition" element={<Transition />} />
            <Route path="deferredValue" element={<DeferredValue />} />
            <Route path="suspense" element={<Suspense_ />} />
            <Route path="contextProvider" element={<ContextProvider />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export { MyRoutes as default, MyRoutes as Routes };
