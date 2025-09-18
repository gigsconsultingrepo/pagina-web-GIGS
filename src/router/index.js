import store from "@/store/index";
import { createRouter, createWebHistory } from "vue-router";

// Vistas existentes
import HomeRouter from '@/modules/home/views/homeComponent.vue';
import loginRouter from '@/modules/login/views/loginComponent.vue';
import aboutRouter from '@/modules/about/views/aboutComponent.vue';
import clientsRouter from '@/modules/clients/views/clientsComponent.vue';
import servicesRouter from '@/modules/services/views/servicesComponent.vue';
import challengesRouter from '@/modules/challenges/views/challengesComponent.vue';
import blogRouter from '@/modules/blog/views/blogComponent.vue';
import blogDetail from '@/modules/blog/views/blogDetail.vue';
import contactRouter from '@/modules/contact/views/contactComponent.vue';
import ApplicationMaintenance from '@/modules/services/views/serviceViews/ApplicationMaintenance.vue';
import DatabaseManagement from '@/modules/services/views/serviceViews/DatabaseManagement.vue';
import DigitalTransformation from "@/modules/services/views/serviceViews/DigitalTransformation.vue";
import TaaS from "@/modules/services/views/serviceViews/TaaS.vue";
import ServiceDesk from "@/modules/services/views/serviceViews/ServiceDesk.vue";
import SoftwareFactory from "@/modules/services/views/serviceViews/SoftwareFactory.vue";
import NotFound from '@/views/View404.vue';
import AdminNewsList from '@/modules/news/views/newsList.vue';

// NUEVO: Vistas de Noticias (ajusta estas rutas a tu estructura)
import NewsList from '@/modules/news/views/newsList.vue';
import NewsDetail from '@/modules/news/views/newsDetail.vue';
import AdminNews from '@/modules/news/views/adminNews.vue';

// NUEVO: Firebase Auth para el guard
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeRouter },
    { path: '/iniciar-sesion', name: 'login', component: loginRouter },
    { path: '/acerca-de-gigs', name: 'about', component: aboutRouter },
    { path: '/clientes', name: 'clients', component: clientsRouter },
    { path: '/retos', name: 'challenges', component: challengesRouter },
    { path: '/servicios', name: 'services', component: servicesRouter },
    { path: '/blog', name: 'blog', component: blogRouter },
    { path: '/blog/:slug', name: 'blog-detail', component: blogDetail, props: true },
    { path: '/contacto', name: 'contact', component: contactRouter },

    // Servicios
    { path: '/servicios/mantenimiento-aplicaciones', name: 'mantenimiento-aplicaciones', component: ApplicationMaintenance },
    { path: '/servicios/gestion-base-datos', name: 'gestion-base-datos', component: DatabaseManagement },
    { path: '/servicios/transformación-digital', name: 'transformación-digital', component: DigitalTransformation },
    { path: '/servicios/mesa-ayuda', name: 'mesa-ayuda', component: ServiceDesk },
    { path: '/servicios/fabrica-software', name: 'fabrica-software', component: SoftwareFactory },
    { path: '/servicios/taas', name: 'taas', component: TaaS },

    // NUEVO: Noticias públicas
    { path: '/noticias', name: 'news-list', component: NewsList },
    { path: '/noticias/:slug', name: 'news-detail', component: NewsDetail, props: true },

    // NUEVO: Admin de noticias (protegido)
    { path: '/admin/noticias', name: 'admin-news', component: AdminNews, meta: { requiresAuth: true } },
    { path: '/admin/noticias-lista', name: 'admin-news-list', component: AdminNewsList, meta: { requiresAuth: true } },


    // 404
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, top: 64, behavior: 'smooth' };
    }
    return { left: 0, top: 0 };
  }
});

// ===== Guard de autenticación para rutas con meta.requiresAuth =====
const waitForAuthReady = () =>
  new Promise(resolve => {
    const off = onAuthStateChanged(auth, () => { off(); resolve(); });
  });

router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAuth) {
    await waitForAuthReady();
    if (!auth.currentUser) {
      return next({ name: 'login', query: { redirect: to.fullPath } });
    }
  }
  next();
});

export default router;
