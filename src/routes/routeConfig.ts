export const routesConfig = {
   // ------------------------------private routes
   dashboard: '/dashboard',

   devices: '/devices',
   addDevices: '/devices/addDevices',
   deleteDevices: '/devices/deleteDevices',
   listDevices: '/devices/listDevices',

   services: '/services',

   // ------------------------------public routes
   login: '/',
   forgotPassword: '/forgotPassword',
   resetPassword: '/resetPassword',

   // ------------------------------ 404 routes
   page404: '*',
};
