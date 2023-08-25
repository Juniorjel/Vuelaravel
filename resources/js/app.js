import "./bootstrap";

import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";

import routes from "./route.js";
import { createRouter, createWebHistory } from "vue-router";
import { createApp } from "vue/dist/vue.esm-bundler.js";

const app = createApp({});

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

app.use(router);

app.mount("#app");
