import { createRouter, createWebHistory } from "vue-router";

import Home from "./components/home.vue";
import Login from "./components/Login.vue";
import Oficinas from "./components/oficinas.vue";
import OficinaDetalle from "./components/OficinaDetalle.vue";
import Desarrollos from "./components/desarrollos.vue";
import DesarrolloDetalle from "./components/DesarrolloDetalle.vue";
import Extensiones from "./components/extensiones.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/home/oficinas",
      },
      {
        path: "",
        redirect: "/home/desarrollos",
      },
      {
        path: "oficinas",
        name: "oficinas",
        component: Oficinas,
      },
      {
        path: "oficina-detalle",
        name: "oficina-detalle",
        component: OficinaDetalle,
      },
      {
        path: "desarrollos",
        name: "desarrollos",
        component: Desarrollos,
      },
      {
        path: "desarrollo-detalle",
        name: "desarrollo-detalle",
        component: DesarrolloDetalle,
      },
      {
        path: "extensiones",
        name: "extensiones",
        component: Extensiones,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("usuarioAutenticado") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else if (to.path === "/" && isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
