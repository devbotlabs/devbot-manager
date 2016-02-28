import CAdmin from './components/app';
// import Test from './components/test';
import Dashboard from './components/dashboard';
import CollectionView from './components/collection';
import CollectionItemView from './components/collection-item';
import Landingpage from './Landingpage';



export default {
  path: '/cadmin',
  component: CAdmin,
  indexRoute: { component: Dashboard },
  childRoutes: [
         { path: 'dashboard', component: Dashboard },
        { path: 'collection/:cname', component: CollectionView },
        { path: 'collection/:cname/:itemId', component: CollectionItemView },
        { path: 'collection/:cname/create-entry', component: CollectionItemView },
    
  ]
};