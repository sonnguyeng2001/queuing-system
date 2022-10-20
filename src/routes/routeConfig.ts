const devicesPage = '/devices';

export const routesConfig = {
   // ------------------------------private routes
   dashboard: '/dashboard',

   devices: '/devices',
   addDevices: '/devices/addDevices',
   detailsDevices: '/devices/detailsDevices/:id',
   updateDevices: '/devices/updateDevices/:id',
   listDevices: '/devices/listDevices',

   services: '/services',

   // ------------------------------public routes
   login: '/',
   forgotPassword: '/forgotPassword',
   resetPassword: '/resetPassword',

   // ------------------------------ 404 routes
   page404: '*',
};
