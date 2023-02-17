
import HomePage from '../pages/home.vue';
import CatalogPage from '../pages/catalog.vue';
import TestPage from '../pages/test.vue';


var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/test/',
    component: TestPage,
  }
];

export default routes;
