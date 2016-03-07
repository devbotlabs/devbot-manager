// polyfill webpack require.ensure
// if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

// import App from '../components/App'
// import Index from '../components/Index'
// import _ from 'underscore'

export default {
  path: '/',
  component: require('./modules/landingpage/index'),
//   getChildRoutes(location, cb) {
//     require.ensure([], (require) => {
//       cb(null, [
//           require('./AboutRoute')
//           ])
          
          
      
//     })
    // require.ensure([], (require) => {
    //   cb('cadmin', [ 
    //     ])
    // })
//   }
}
   
