import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Home from "@/authentication/home.vue";
import login from "@/authentication/Login.vue";
import FullSignUp from "@/authentication/fullSignUp.vue";
import OrgSignUp from "@/authentication/orgSignUp.vue";
import TypeOfUser from "@/authentication/typeOfUser.vue";
import userpage from "@/views/Userpage.vue";
import orgpage from "@/views/Organizationpage.vue";



// import UserUpdate from "./modules/user/Updateform.vue";
// import UserNewsfeed from "./modules/user/Newsfeed.vue";
import UserBadgelist from "./modules/user/Mybadge.vue";

import badges from "./modules/organization/Badges.vue";
import certify from "./modules/organization/Certify.vue";

Vue.use(Router);
// eslint-disable-next-line
/* eslint-disable */
// export default new Router({
let router = new Router({
  mode: "history",

  routes: [{
      path: "/",
      component: Home,
      
    },
    

    {
      path: "/login",
      component: login,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (!store.getters.isLoggedIn) {
          next();
        } else {
          next("/");
        }
      },
    },

    {
      path: "/signup",
      component: FullSignUp,
      props: (route) => ({
        name: route.query.name,
      })
    },
    {
      path: "/organizationsignup",
      component: OrgSignUp,
      props: (route) => ({
        name: route.query.name,
        beforeEnter(to, from, next) {
        if (!store.getters.isLoggedIn) {
          next();
        } else {
          next("/");
        }
      },
      })
    },
    {
      path: "/signUpAs",
      component: TypeOfUser,
      props: (route) => ({
        name: route.query.name,
        beforeEnter(to, from, next) {
          if (!store.getters.isLoggedIn) {
            next();
          } else {
            next("/");
          }
        },
      }),
      children: [
        {path: "organization",
        component: OrgSignUp
    
        },
        {
          path: "",
          component: FullSignUp
        }
      ]
    },
    {
      path: "/user",
      component: userpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            if (data) {
              next();
            } else {
              next("/login");
            }
          })
        } else {
          next("/login");
        }
      },
      children: [
        {
          path: "",
          component: UserBadgelist,
        },
        {
          path: "updateprofile",
          component: FullSignUp,
        }
      ]
    },
    {
      path: "/organization",
      component: orgpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            if (!data) {
              next();
            } else {
              next("/login");
            }
          })
        } else {
          next("/login");
        }
      },
      children: [
        {
          path: "",
          component: badges,
        },
        {
          path: "certify",
          component: certify
        },
        {
          path: "updateprofile",
          component: OrgSignUp,
        }
      ]
    },
  ]
})

export default router
