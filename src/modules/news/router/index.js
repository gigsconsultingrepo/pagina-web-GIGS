import NewsList from '@/modules/news/views/newsList.vue';
import NewsDetail from '@/modules/news/views/newsDetail.vue';
import AdminNews from '@/modules/news/views/adminNews.vue';
import AdminNewsList from '@/modules/news/views/newsList.vue';
import AdminServices from '@/modules/services/views/AdminServices.vue';
import AdminDashboard from '@/modules/admin/views/AdminDashboard.vue';


export default [
  // NUEVO: Noticias públicas
  { path: '/noticias', name: 'news-list', component: NewsList },
  { path: '/noticias/:slug', name: 'news-detail', component: NewsDetail, props: true },

  // Admin: dashboard
  { path: '/admin', name: 'admin-dashboard', component: AdminDashboard, meta: { requiresAuth: true } },

  // Admin: servicios
  { path: '/admin/servicios', name: 'admin-services', component: AdminServices, meta: { requiresAuth: true } },

  // Admin: noticias (protegido)
  { path: '/admin/noticias', name: 'admin-news', component: AdminNews, meta: { requiresAuth: true } },
  { path: '/admin/noticias-lista', name: 'admin-news-list', component: AdminNewsList, meta: { requiresAuth: true } },

]

