import Dashboard from "./components/dashboard.vue";
import Appointemts from "./components/appointments.vue";
import About from "./components/about.vue";
import User from "./components/users.vue";

export default [
    {
        path: "/admin/dashboard",
        name: "admin.dashboard",
        component: Dashboard,
    },
    {
        path: "/admin/abouts",
        name: "admin.about",
        component: About,
    },
    {
        path: "/admin/users",
        name: "admin.user",
        component: User,
    },
    {
        path: "/admin/appointments",
        name: "admin.appointemnts",
        component: Appointemts,
    },
];
