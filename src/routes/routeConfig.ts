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
   addServices: '/services/addServices',
   detailsServices: '/services/detailsServices/:id',
   updateServices: '/services/updateServices/:id',

   customerService: '/customerService',
   listCustomerService: '/customerService/listCustomerService',
   addCustomerService: '/customerService/addCustomerService',

   report: '/report',
   listReport: '/report/listReport',

   setting: '/setting',
   settingRole: '/setting/settingRole',
   settingAccount: '/setting/settingAccount',
   settingHistoryUser: '/setting/settingHistoryUser',

   // ------------------------------public routes
   login: '/',
   forgotPassword: '/forgotPassword',
   resetPassword: '/resetPassword',

   // ------------------------------ 404 routes
   page404: '*',
};
