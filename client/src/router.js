import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing";
import Login from "./views/Login";
import isAuth from "./isAuth";
import RoomMessages from "./components/RoomMessages";
import CreateRoom from "./components/CreateRoom";

Vue.use(Router);

let router = new Router({
  linkActiveClass: "md-active",
  linkExactActiveClass: "md-active",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "landing",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Landing,
      children: [
        {
          path: "room/:room",
          component: RoomMessages,
          children: [
            {
              path: "find_room",
              component: CreateRoom
            }
          ]
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuth.isAuthenticated) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
