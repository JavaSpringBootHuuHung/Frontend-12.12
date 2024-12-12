// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'; // Sửa đường dẫn
import MyDictionary from './components/MyDictionary.vue'; // Đường dẫn tới component Dictionary
import MyCalculator from './components/MyCalculator.vue';

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/dictionary',
    name: 'MyDictionary',
    component: MyDictionary
  },
  {
    path: '/calculator',
    name: "MyCalculator",
    component : MyCalculator
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;