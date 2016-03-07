import CAdmin from './components/app';



export default {
  path: '/',
  component: 'div',
  indexRoute: { component: CAdmin },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [ 
         { path: 'dashboard', component: require('./components/dashboard') },
        { path: 'collection/:cname', component: require('./components/collection') },
        { path: 'collection/:cname/create-entry', component: require('./components/collection') },
        {path:'collection/:cname/:itemId', component: require('./components/collection-item')  }
        
        ])
    })
  }
};
