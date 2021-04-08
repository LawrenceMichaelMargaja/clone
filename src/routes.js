import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const LoginPage = asyncComponent(() => import('./views/LoginPage/LoginPage'));

var dashRoutes = [
    {
        path: "/login",
        name: "home",
        component: LoginPage,
        layout: "/admin",
        invisible:true
    },
];

export default dashRoutes;