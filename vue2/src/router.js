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
import axios from 'axios'

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
      meta: {
        requiresAuth: true
      },
      props: (route) => ({
        name: route.query.name
      })
    },
    {
      path: '/organization',
      component: orgpage,
      meta: {
        requiresAuth: true
      },
      props: (route) => ({
        name: route.query.name
      })
    },
  ]
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      console.log(store.getters.token)
      var userType;
      axios.post(
          "http://localhost:8081/user/userType", {
            data: store.getters.token
          }
        )
        .then(resp => {
          userType = resp.data.userType;
          console.log(userType)
          if (userType == "Regular user") {
            next('/user')
          }
          
          
        })
        .catch(err => {
          console.log(err);
        })
     
    }
    return
    next('/login')
  } else {
    next()
  }
})

export default router
