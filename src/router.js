// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'; // Sửa đường dẫn
import MyDictionary from './views/MyDictionary.vue'; // Đường dẫn tới component Dictionary
import MyCalculator from './views/MyCalculator.vue';
import GreeTing from './views/GreeTing.vue';
import ManageEmployee from './views/ManageEmployee.vue';

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
  },
  {
    path : '/employee',
    name: "ManageEmployee",
    component: ManageEmployee
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;