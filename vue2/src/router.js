import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './authentication/home'
import login from './authentication/Login'
import FullSignUp from './authentication/fullSignUp'
import OrgSignUp from './authentication/orgSignUp'
import TypeOfUser from './authentication/typeOfUser'
import userpage from './views/Userpage'
import orgpage from './views/Organizationpage'

Vue.use(Router)

// export default new Router({
let router = new Router({
  mode: 'history',

  routes: [{
      path: '/',
      component: Home
    },

    {
      path: '/login',
      component: login,
      props: (route) => ({
        name: route.query.name
      })
    },

    {
      path: '/signup',
      component: FullSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/organizationsignup',
      component: OrgSignUp,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/signUpAs',
      component: TypeOfUser,
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/user',
      component: userpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            console.log(data)
            if (data) {
              next()
            } else {
              next("/login")
            }
          })
        } else {
          next("/login")
        }
      }
    },
    {
      path: '/organization',
      component: orgpage,
      props: (route) => ({
        name: route.query.name
      }),
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          store.dispatch("identifyUser").then((data) => {
            console.log(data)
            if (!data) {
              next()
            } else {
               next("/login")
            }
          })
        } else {
          next("/login")
        }
      }
    },
  ]
})

export default router
