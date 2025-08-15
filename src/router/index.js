import store from "@/store/index";
import sampleRouter from "@/modules/guias/sample/router";
import { useRouter } from "vue-router";

import NotFound from '@/views/View404.vue';

import { createRouter, createWebHistory } from "vue-router";
import HomeRouter from '@/modules/home/views/homeComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes:
    [
      ...sampleRouter,
      {
        path: "/",
        name: "home",
        component: HomeRouter,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
      }
    ],
});

export default router;
