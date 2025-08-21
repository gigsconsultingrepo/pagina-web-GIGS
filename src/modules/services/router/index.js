import servicesComponent from "../views/servicesComponent.vue"
import ApplicationMaintenance from "../views/serviceViews/ApplicationMaintenance.vue"
import DatabaseManagement from "../views/serviceViews/DatabaseManagement.vue"
import DigitalTransformation from "../views/serviceViews/DigitalTransformation.vue"
import ServiceDesk from "../views/serviceViews/ServiceDesk.vue"
import SoftwareFactory from "../views/serviceViews/SoftwareFactory.vue"
import TaaS from "../views/serviceViews/TaaS.vue"

export default [
  {
    path: '/servicios',
    name: 'services',
    component: servicesComponent
  },
  {
    path: '/servicios/mantenimiento-aplicaciones',
    name: 'mantenimiento-aplicaciones',
    component: ApplicationMaintenance
  },
  {
    path: '/servicios/gestion-base-datos',
    name: 'gestion-base-datos',
    component: DatabaseManagement
  },
  {
    path: '/servicios/transformación-digital',
    name: 'transformación-digital',
    component: DigitalTransformation
  },
  {
    path: '/servicios/mesa-ayuda',
    name: 'mesa-ayuda',
    component: ServiceDesk
  },
  {
    path: '/servicios/fabrica-software',
    name: 'fabrica-software',
    component: SoftwareFactory
  },
  {
    path: '/servicios/taas',
    name: 'taas',
    component: TaaS
  },
]
