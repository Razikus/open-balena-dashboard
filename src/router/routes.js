
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Authorization.vue'), name: 'name' },
      { path: '', component: () => import('pages/Authorization.vue') },
      { path: 'home', component: () => import('pages/Index.vue'), meta: { requiresAuth: true }, name: 'home' },
      { path: 'application/:id', component: () => import('pages/ApplicationView.vue'), meta: { requiresAuth: true }, name: "application" },
      { path: "appenvs/:id", component: () => import('pages/ApplicationEnvs.vue'), meta: { requiresAuth: true }, name: "applicationEnvs" },
      { path: "deviceenvs/:id/:deviceid", component: () => import('pages/DeviceEnvs.vue'), meta: { requiresAuth: true }, name: "deviceEnvs" },
      { path: "history/:id", component: () => import('pages/ApplicationHistory.vue'), meta: { requiresAuth: true }, name: "history" }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
