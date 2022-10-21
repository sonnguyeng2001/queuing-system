const devicesPage = '/devices';

export const routesConfig = {
   // ------------------------------private routes
   dashboard: '/dashboard',

   devices: '/devices',
   listDevices: '/devices/listDevices',
   addDevices: '/devices/addDevices',
   detailsDevices: '/devices/detailsDevices/:id',
   updateDevices: '/devices/updateDevices/:id',

   services: '/services',
   listServices: '/services/listServices',
   detailsServices: '/services/detailsServices/:id',
   updateServices: '/services/updateServices/:id',

   // ------------------------------public routes
   login: '/',
   forgotPassword: '/forgotPassword',
   resetPassword: '/resetPassword',

   // ------------------------------ 404 routes
   page404: '*',
};
