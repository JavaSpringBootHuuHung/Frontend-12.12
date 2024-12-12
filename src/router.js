// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'; // Sửa đường dẫn
import MyDictionary from './components/MyDictionary.vue'; // Đường dẫn tới component Dictionary
import MyCalculator from './components/MyCalculator.vue';
import GreeTing from './components/GreeTing.vue';

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
  },
  {
    path: '/greeting',
    name: "GreeTing",
    component : GreeTing
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;