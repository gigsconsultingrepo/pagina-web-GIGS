import store from "@/store/index";
import { createRouter, createWebHistory } from "vue-router";

// Vistas
import HomeRouter from '@/modules/home/views/homeComponent.vue';
import loginRouter from '@/modules/login/views/loginComponent.vue';
import aboutRouter from '@/modules/about/views/aboutComponent.vue';
import clientsRouter from '@/modules/clients/views/clientsComponent.vue';
import servicesRouter from '@/modules/services/views/servicesComponent.vue';
import challengesRouter from '@/modules/challenges/views/challengesComponent.vue';
import blogRouter from '@/modules/blog/views/blogComponent.vue';
import blogDetail from '@/modules/blog/views/blogDetail.vue';
import contactRouter from '@/modules/contact/views/contactComponent.vue';
import NotFound from '@/views/View404.vue';

// Noticias / Admin
import NewsList from '@/modules/news/views/newsList.vue';
import NewsDetail from '@/modules/news/views/newsDetail.vue';
import AdminNews from '@/modules/news/views/adminNews.vue';
import AdminNewsList from '@/modules/news/views/newsList.vue';
import AdminServices from '@/modules/services/views/AdminServices.vue';
import AdminDashboard from '@/modules/admin/views/AdminDashboard.vue';
import VerifyEmail from '@/modules/login/views/VerifyEmail.vue';

// Firebase Auth
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeRouter },
    { path: '/iniciar-sesion', name: 'login', component: loginRouter },
    { path: '/verificar-correo', name: 'verify-email', component: VerifyEmail, meta: { requiresAuth: true } },
    { path: '/acerca-de-gigs', name: 'about', component: aboutRouter },
    { path: '/clientes', name: 'clients', component: clientsRouter },
    { path: '/retos', name: 'challenges', component: challengesRouter },

    // Servicios dinámicos: debe ir antes de la ruta general
    { 
      path: '/servicios/:slug', 
      name: 'service-detail', 
      component: () => import('@/modules/services/views/serviceViews/ServiceDetail.vue'), 
      props: true 
    },

    // Página general de servicios
    { path: '/servicios', name: 'services', component: servicesRouter },

    // Blog
    { path: '/blog', name: 'blog', component: blogRouter },
    { path: '/blog/:slug', name: 'blog-detail', component: blogDetail, props: true },

    // Contacto
    { path: '/contacto', name: 'contact', component: contactRouter },

    // Noticias públicas
    { path: '/noticias', name: 'news-list', component: NewsList },
    { path: '/noticias/:slug', name: 'news-detail', component: NewsDetail, props: true },

    // Admin: dashboard
    { path: '/admin', name: 'admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true } },

    // Admin: servicios
    { path: '/admin/servicios', name: 'admin-services', component: AdminServices, meta: { requiresAuth: true } },

    // Admin: noticias
    { path: '/admin/noticias', name: 'admin-news', component: AdminNews, meta: { requiresAuth: true } },
    { path: '/admin/noticias-lista', name: 'admin-news-list', component: AdminNewsList, meta: { requiresAuth: true } },

    // 404
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    // Solo hacer scroll si viene el query parameter scrollToForm=true
    if (to.hash && to.query.scrollToForm === 'true') {
      // Esperar a que todos los componentes se carguen, especialmente los que cargan datos de Firestore
      return new Promise((resolve) => {
        let attempts = 0
        const maxAttempts = 20 // Aumentado para dar más tiempo a que carguen los servicios
        
        const tryScroll = () => {
          attempts++
          const element = document.querySelector(to.hash)
          
          if (element) {
            // Verificar que el elemento esté en el DOM y tenga posición válida
            const rect = element.getBoundingClientRect()
            // Verificar que el elemento tenga altura y esté en el viewport o debajo
            if (rect.height > 0 && (rect.top >= 0 || rect.bottom >= 0)) {
              const topbarHeight = 64
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              const offsetPosition = Math.max(0, elementPosition - topbarHeight)
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
              
              // Limpiar el query parameter después de hacer scroll
              setTimeout(() => {
                if (window.history.replaceState) {
                  const newUrl = window.location.pathname + window.location.hash
                  window.history.replaceState({}, '', newUrl)
                }
              }, 100)
              
              resolve({ el: to.hash, top: 64, behavior: 'smooth' })
              return
            }
          }
          
          // Si no se encontró o no está listo, intentar de nuevo
          if (attempts < maxAttempts) {
            // Aumentar el delay progresivamente
            const delay = attempts < 5 ? 300 : attempts < 10 ? 500 : 800
            setTimeout(tryScroll, delay)
          } else {
            // Último intento después de más tiempo
            setTimeout(() => {
              const element = document.querySelector(to.hash)
              if (element) {
                const topbarHeight = 64
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = Math.max(0, elementPosition - topbarHeight)
                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                })
              }
              // Limpiar el query parameter después de hacer scroll
              setTimeout(() => {
                if (window.history.replaceState) {
                  const newUrl = window.location.pathname + window.location.hash
                  window.history.replaceState({}, '', newUrl)
                }
              }, 100)
              resolve({ el: to.hash, top: 64, behavior: 'smooth' })
            }, 1000)
          }
        }
        
        // Empezar después de un delay inicial más largo para dar tiempo a que se monten los componentes
        setTimeout(tryScroll, 300)
      })
    }
    return { left: 0, top: 0 }
  }
});

// Guard de autenticación
// Esperar a que Firebase Auth esté completamente inicializado y obtener el estado del usuario
const getCurrentUser = () =>
  new Promise((resolve) => {
    // Si ya hay un usuario en currentUser, resolver inmediatamente
    if (auth.currentUser) {
      return resolve(auth.currentUser);
    }
    
    // onAuthStateChanged se dispara inmediatamente con el estado actual
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Desuscribirse después del primer cambio
      // Verificar tanto el callback como currentUser para mayor seguridad
      const finalUser = user || auth.currentUser;
      resolve(finalUser); // Resolver con el usuario (o null si no está autenticado)
    });
  });

// Lista de emails que tienen permisos de admin
const ADMIN_EMAILS = [
  'marianacubillos13@gmail.com', // Cambia este email por el del admin real
  // Agrega más emails de admin aquí si es necesario
]

const isUserAdmin = (email) => {
  if (!email) return false
  return ADMIN_EMAILS.some(adminEmail => 
    email.toLowerCase() === adminEmail.toLowerCase()
  )
}

router.beforeEach(async (to, from, next) => {
  // Proteger cualquier ruta que empiece con /admin
  const isAdminRoute = to.path.startsWith('/admin');
  
  // Si es una ruta de admin o tiene requiresAuth, verificar autenticación
  if (isAdminRoute || to.meta?.requiresAuth) {
    // Obtener el usuario actual (espera a que Firebase Auth esté listo)
    const user = await getCurrentUser();
    
    // Verificación adicional: también verificar auth.currentUser directamente
    const currentUser = auth.currentUser;
    
    // Si no hay usuario autenticado (ni en el callback ni en currentUser), redirigir al login
    if (!user && !currentUser) {
      return next({ 
        name: 'login', 
        query: { redirect: to.fullPath } 
      });
    }
    
    const authenticatedUser = user || currentUser;
    
    // Verificar que el correo esté verificado (excepto para la ruta de verificación)
    if (authenticatedUser && !authenticatedUser.emailVerified && to.name !== 'verify-email') {
      return next({ name: 'verify-email' });
    }
    
    // Proteger la ruta de servicios para que solo el admin pueda acceder
    if (to.path === '/admin/servicios' || to.name === 'admin-services') {
      const userEmail = authenticatedUser?.email || '';
      if (!isUserAdmin(userEmail)) {
        return next({ name: 'admin-dashboard' });
      }
    }
  }
  
  // Si está intentando acceder al login y ya está autenticado, redirigir al admin
  if (to.name === 'login') {
    const user = await getCurrentUser();
    const currentUser = auth.currentUser;
    if (user || currentUser) {
      return next({ name: 'admin-dashboard' });
    }
  }
  
  next();
});

export default router;

