import PageLoader from 'components/common/loading/PageLoader';
import Splash from 'components/common/loading/Splash';
import AuthLayout from 'layouts/auth-layout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './path';
import ProtectedRoute from 'components/common/protectedRoute/ProtectedRoute';

import CategoriesDetails from 'pages/comapanies/CategoriesDetails';
import PermissionsPage from 'pages/permissions';
import SubAdminsPage from 'pages/subadmins';
import MasterDataPage from 'pages/masterData';
import PageNotFound from 'errors/PageNotFound';
import CompaniesPage from 'pages/comapanies';
import BranchesPage from 'pages/branches';
import CashiersPage from 'pages/cashiers';
import UsersPage from '../pages/Users';

// Lazy-loaded components
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const LoginPage = lazy(() => import('pages/authentication/login'));
const SignUpPage = lazy(() => import('pages/authentication/register'));
const ForgotPasswordPage = lazy(() => import('pages/authentication/forgot-password'));
const PasswordResetPage = lazy(() => import('pages/authentication/reset-password'));
const CategoriesPage = lazy(() => import('pages/comapanies'));
const Dashboard = lazy(() => import('pages/dashboard/index'));

const isLoggedIn = localStorage.getItem('clintToken')
  ? Boolean(localStorage.getItem('clintToken'))
  : false;

export const routes = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.categories,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CategoriesPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.employees,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CategoriesPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.users,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <UsersPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.masterData,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <MasterDataPage />
              </ProtectedRoute>
            ),
            children: [
              {
                index: true, // Default route for /master-data
                element: <CompaniesPage isDashBoard={false} />,
              },
              {
                path: 'branch',
                element: <BranchesPage isDashBoard={false} />,
              },
              {
                path: 'cashier',
                element: <CashiersPage isDashBoard={false} />,
              },
            ],
          },

          {
            path: paths.permissions,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <PermissionsPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },

          {
            path: paths.subAdmins,
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <SubAdminsPage isDashBoard={false} />
              </ProtectedRoute>
            ),
          },
          {
            path: `${paths.categories}/:id`, // Fixed typo
            element: (
              <ProtectedRoute isAllowed={isLoggedIn} redirect={paths.login}>
                <CategoriesDetails />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.login,
            element: (
              <ProtectedRoute isAllowed={!isLoggedIn} redirect={paths.default}>
                <LoginPage />
              </ProtectedRoute>
            ),
          },
          {
            path: paths.signup,
            element: <SignUpPage />,
          },
          {
            path: paths.forgotPassword,
            element: <ForgotPasswordPage />,
          },
          {
            path: paths.resetPassword,
            element: <PasswordResetPage />,
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notFound,
            element: <PageNotFound />,
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;
