// Replace 'admin' by your chunk name
// export default require('./routes');

// This ensure the admin is not bundled with the app on the client
// The script will be loaded only when needed
import {CAdminSettings} from 'CAdmin/collections/cAdminSettings';
import {CAdminSettingsSchema} from 'CAdmin/collections/cAdminSettings';

window.CAdminSettings = CAdminSettings;

// if(Meteor.isClient) {
//   export default {
//   path: 'cadmin',
//   indexRoute: {
//     onEnter: function (nextState, replaceState) {
//       // Redirect to dashboard by default
//       replaceState(null, '/cadmin/dashboard');
//     }
//   },
//   getChildRoutes(location, cb) {
//     if (Meteor.isClient) {
//       // Split the code on a different file when on a client
//       require.ensure([], require => {
//         cb(null, require('./routes'))
//       }, 'cadmin');
//     } else {
//       // Save the chunk for server-rendering
//       global.__CHUNK_COLLECTOR__.push('cadmin')
//       cb(null, require('./routes'));
//     }
//   }
// };
// }else {
  
  export default require('./routes');

// }

