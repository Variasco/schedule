import { Profile, Schedule, About, SignUpPage, SignInPage } from "../pages";

export const privateRoutes = [
    { path: "/", component: <Schedule />, exact: true },
    { path: "/profile", component: <Profile />, exact: true },
    { path: "/about", component: <About />, exact: true },
];

export const publicRoutes = [
    { path: "/sign-in", component: <SignInPage />, exact: true },
    { path: "/sign-up", component: <SignUpPage />, exact: true },
];
