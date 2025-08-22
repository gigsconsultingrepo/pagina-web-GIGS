import store from "@/store/index";
import { useRouter } from "vue-router";
import sampleRouter from "@/modules/guias/sample/router";
import HomeRouter from '@/modules/home/views/homeComponent.vue';
import aboutRouter from '@/modules/about/views/aboutComponent.vue';
import clientsRouter from '@/modules/clients/views/clientsComponent.vue';
import servicesRouter from '@/modules/services/views/servicesComponent.vue';
import challengesRouter from '@/modules/challenges/views/challengesComponent.vue';
import blogRouter from '@/modules/blog/views/blogComponent.vue';
import contactRouter from '@/modules/contact/views/contactComponent.vue';
import ApplicationMaintenance from '@/modules/services/views/serviceViews/ApplicationMaintenance.vue';
import DatabaseManagement from '@/modules/services/views/serviceViews/DatabaseManagement.vue';
import DigitalTransformation from "@/modules/services/views/serviceViews/DigitalTransformation.vue";
import TaaS from "@/modules/services/views/serviceViews/TaaS.vue";
import ServiceDesk from "@/modules/services/views/serviceViews/ServiceDesk.vue";
import SoftwareFactory from "@/modules/services/views/serviceViews/SoftwareFactory.vue";

import NotFound from '@/views/View404.vue';

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes:
    [
      {
        path: "/",
        name: "home",
        component: HomeRouter,
      },
      {
        path: '/acerca-de-gigs',
        name: 'about',
        component: aboutRouter
      },
      {
        path: '/clientes',
        name: 'clients',
        component: clientsRouter
      },
      {
        path: '/retos',
        name: 'challenges',
        component: challengesRouter
      },
      {
        path: '/servicios',
        name: 'services',
        component: servicesRouter
      },
      {
        path: '/blog',
        name: 'blog',
        component: blogRouter
      },
      {
        path: '/contacto',
        name: 'contact',
        component: contactRouter
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
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
      }
    ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return {
        el: to.hash,
        top: 64, 
        behavior: 'smooth'
      }
    }
    return { left: 0, top: 0 }
  }
});

export default router;
