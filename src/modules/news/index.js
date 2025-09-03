import router from './router'
import store from './store' 
import NewsList from '@/modules/news/views/newsList.vue';
import NewsDetail from '@/modules/news/views/newsDetail.vue';
import AdminNews from '@/modules/news/views/adminNews.vue';

export default {
  name: 'newsModule',
  router,
  store,
  NewsList,
  NewsDetail,
  AdminNews
}
