import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "./helpers/AdminRoute";

const LoginPage = lazy(() => import('./pages/auth/login/Index'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password/Index'));
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password/Index'));
const NotFoundPage = lazy(() => import('./pages/not-found/Index'));
const DashboardPage = lazy(() => import('./pages/dashboard/Index'));
const UserListPage = lazy(() => import('./pages/users/Index'));
const UserDetailsPage = lazy(() => import('./pages/users/UserDetails'));
const PostListPage = lazy(() => import('./pages/posts/Index'));
const PostDetailsPage = lazy(() => import('./pages/posts/PostDetails'));
const ProfilePage = lazy(() => import('./pages/profile/Index'));
const VerificationRequestsListPage = lazy(() => import('./pages/verification-requests/Index'));
const VerificationRequestDetails = lazy(() => import('./pages/verification-requests/VerificationRequestDetails'));
const ProjectListPage = lazy(() => import('./pages/projects/Index'));
const ProjectDetailsPage = lazy(() => import('./pages/projects/ProjectDetails'));

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

            <Route path="/" element={<AdminRoute> <DashboardPage /> </AdminRoute>} />

            <Route path="/profile" element={<AdminRoute> <ProfilePage /> </AdminRoute>} />

            <Route path="/users" element={<AdminRoute> <UserListPage /> </AdminRoute>} />
            <Route path="/users/:id" element={<AdminRoute> <UserDetailsPage /> </AdminRoute>} />

            <Route path="/posts" element={<AdminRoute> <PostListPage /> </AdminRoute>} />
            <Route path="/posts/:id" element={<AdminRoute> <PostDetailsPage /> </AdminRoute>} />

            <Route path="/projects" element={<AdminRoute> <ProjectListPage /> </AdminRoute>} />
            <Route path="/projects/:id" element={<AdminRoute> <ProjectDetailsPage /> </AdminRoute>} />

            <Route path="/verification-requests" element={<AdminRoute> <VerificationRequestsListPage /> </AdminRoute>} />
            <Route path="/verification-requests/:id" element={<AdminRoute> <VerificationRequestDetails /> </AdminRoute>} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes;