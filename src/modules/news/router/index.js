import NewsList from '@/modules/news/views/newsList.vue';
import NewsDetail from '@/modules/news/views/newsDetail.vue';
import AdminNews from '@/modules/news/views/adminNews.vue';
import AdminNewsList from '@/modules/news/views/newsList.vue';


export default [
  // NUEVO: Noticias públicas
  { path: '/noticias', name: 'news-list', component: NewsList },
  { path: '/noticias/:slug', name: 'news-detail', component: NewsDetail, props: true },

  // NUEVO: Admin de noticias (protegido)
  { path: '/admin/noticias', name: 'admin-news', component: AdminNews, meta: { requiresAuth: true } },
  { path: '/admin/noticias-lista', name: 'admin-news-list', component: AdminNewsList, meta: { requiresAuth: true } },

]

