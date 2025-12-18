import servicesComponent from '../views/servicesComponent.vue'

export default [
  {
    path: '/servicios',
    name: 'services',
    component: servicesComponent
  },
  {
    path: '/servicios/:slug',
    name: 'service-detail',
    component: () => import('../views/serviceViews/ServiceDetail.vue'),
    props: true
  }
]
